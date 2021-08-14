import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkEmail } from '../../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../../form/FormInput'
import FormButtons from '../../../form/FormButtons'
import { getServiceOrderByIdApiCall, addServiceOrderApiCall, updateServiceOrderApiCall } from '../../../apiCalls/serviceOrdersApiCalls'

class ServiceOrderForm extends React.Component {

    constructor(props) {
        super(props)
        console.log("asd")
        const paramsServiceOrderId = props.match.params.serviceOrderId
        console.log(paramsServiceOrderId)
        const currentFormMode = paramsServiceOrderId ? formMode.EDIT : formMode.NEW

        this.state = {
            serviceOrderId: paramsServiceOrderId,
            serviceOrder: {
                name: '',
                surname: '',
                mobile: '',
                email: '',
                workplace: ''
            },
            errors: {
                name: '',
                surname: '',
                mobile: '',
                email: '',
                workplace: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchServiceOrderDetails()
        }
    }

    fetchServiceOrderDetails = () => {
        getServiceOrderByIdApiCall(this.state.serviceOrderId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            serviceOrder: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            serviceOrder: data,
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
        const serviceOrder = { ...this.state.serviceOrder }
        serviceOrder[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            serviceOrder: serviceOrder,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                serviceOrder = this.state.serviceOrder,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addServiceOrderApiCall(serviceOrder)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(serviceOrder)
                const serviceOrderId = this.state.serviceOrderId
                promise = updateServiceOrderApiCall(serviceOrderId, serviceOrder)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data
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
        if (fieldName === 'surname') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        } 
        if (fieldName === 'mobile') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'workplace') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkTextLengthRange(fieldValue)) {
                errorMessage = "Pole powinno zawierać od 5 do 60 znaków";
            } else if (!checkEmail(fieldValue)) {
                errorMessage = "Pole powinno zawierać prawidłowy adres email";
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const serviceOrder = this.state.serviceOrder
        const errors = this.state.errors
        for (const fieldName in serviceOrder) {
            const fieldValue = serviceOrder[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('serviceOrder.notice.new') : t('serviceOrder.notice.edit')
            return (
                <Redirect to={{
                    pathname: "/serviceOrders",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('serviceOrder.form.add.pageTitle') : t('serviceOrder.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        console.log(this.state.serviceOrder)
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                <FormInput
                    type="text"
                    label= {t('serviceOrder.fields.name')}
                    required
                    error={this.state.errors.name}
                    name="name"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.serviceOrder.name}
                />
                <FormInput
                    type="text"
                    label={t('serviceOrder.fields.surname')}
                    required
                    error={this.state.errors.surname}
                    name="surname"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.serviceOrder.surname}
                />
                <FormInput
                    type="number"
                    label={t('serviceOrder.fields.mobile')}
                    required
                    error={this.state.errors.mobile}
                    name="mobile"
                    placeholder="np. 987456321"
                    onChange={this.handleChange}
                    value={this.state.serviceOrder.mobile}
                />
                <FormInput
                    type="text"
                    label={t('serviceOrder.fields.email')}
                    error={this.state.errors.email}
                    name="email"
                    placeholder="example@mail.com"
                    onChange={this.handleChange}
                    value={this.state.serviceOrder.email}
                />
                <FormInput
                    type="text"
                    label={t('serviceOrder.fields.workplace')}
                    required
                    error={this.state.errors.workplace}
                    name="workplace"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.serviceOrder.workplace}
                />
                <FormButtons
                    formMode={this.state.formMode}
                    error={globalErrorMessage}
                    cancelPath="/serviceOrders"
                />
                </form>
            </main>
        )
    }
}
export default withTranslation()(ServiceOrderForm)