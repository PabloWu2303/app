import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange } from '../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../form/FormInput'
import FormButtons from '../../form/FormButtons'
import { getServiceByIdApiCall, addServiceApiCall, updateServiceApiCall } from '../../apiCalls/servicesApiCalls'

class ServiceForm extends React.Component {

    constructor(props) {
        super(props)
        const paramsServiceId = props.match.params.serviceId
        const currentFormMode = paramsServiceId ? formMode.EDIT : formMode.NEW

        this.state = {
            serviceId: paramsServiceId,
            addresses: [],
            service: {
                name: '',
                purpose: ''            },
            errors: {
                name: '',
                purpose: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchServiceDetails()
        }
    }

    fetchServiceDetails = () => {
        getServiceByIdApiCall(this.state.serviceId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            service: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            service: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const service = { ...this.state.service }
        service[name] = value
        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            service: service,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                service = this.state.service,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addServiceApiCall(service)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(service)
                const serviceId = this.state.serviceId
                promise = updateServiceApiCall(serviceId, service)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            }

        }
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'purpose') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const service = this.state.service
        const errors = this.state.errors
        for (const fieldName in service) {
            const fieldValue = service[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }

    render() {
        const { redirect } = this.state
        const { t } = this.props;
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('service.notice.new') : t('service.notice.edit')
            return (
                <Redirect to={{
                    pathname: "/services",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('service.form.new') : t('service.form.edit')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('service.fields.name')}
                        required
                        error={this.state.errors.name}
                        name="name"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.service.name}
                    />
                    <FormInput
                        type="text"
                        label={t('service.fields.purpose')}
                        required
                        error={this.state.errors.purpose}
                        name="purpose"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.service.purpose}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/services"
                    />
                </form>
            </main>
        )
    }
}
export default withTranslation()(ServiceForm)