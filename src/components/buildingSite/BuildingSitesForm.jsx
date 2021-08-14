import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange } from '../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../form/FormInput'
import FormButtons from '../../form/FormButtons'
import FormSelectAddress from '../../form/FormSelectAddress'
import { getAddressesApiCall } from '../../apiCalls/addressesApiCalls'
import { getBuildingSiteByIdApiCall, addBuildingSiteApiCall, updateBuildingSiteApiCall } from '../../apiCalls/buildingSitesApiCalls'

class BuildingSiteForm extends React.Component {

    constructor(props) {
        super(props)
        const paramsBuildingSiteId = props.match.params.buildingSiteId
        const currentFormMode = paramsBuildingSiteId ? formMode.EDIT : formMode.NEW

        this.state = {
            buildingSiteId: paramsBuildingSiteId,
            addresses: [],
            buildingSite: {
                name: '',
                budget: '',
                startDate: '',
                endDate: '',
                address: '',
                employments: []
            },
            errors: {
                name: '',
                budget: '',
                startDate: '',
                endDate: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        this.fetchAddressesList()
        if (currentFormMode === formMode.EDIT) {
            this.fetchBuildingSiteDetails()
        }
    }

    fetchBuildingSiteDetails = () => {
        getBuildingSiteByIdApiCall(this.state.buildingSiteId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            buildingSite: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            buildingSite: data,
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

    fetchAddressesList = () => {
        getAddressesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        addresses: data
                    });
                }
            )
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const buildingSite = { ...this.state.buildingSite }
        buildingSite[name] = value
        console.log(name, value)
        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            buildingSite: buildingSite,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                buildingSite = this.state.buildingSite,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addBuildingSiteApiCall(buildingSite)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(buildingSite)
                const buildingSiteId = this.state.buildingSiteId
                promise = updateBuildingSiteApiCall(buildingSiteId, buildingSite)
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
        if (fieldName === 'budget') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'startDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const buildingSite = this.state.buildingSite
        const errors = this.state.errors
        for (const fieldName in buildingSite) {
            const fieldValue = buildingSite[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('buildingSite.notice.new') : t('buildingSite.notice.edit')
            return (
                <Redirect to={{
                    pathname: "/buildingSites",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('buildingSite.form.add.pageTitle') : t('buildingSite.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                                <form className="form" onSubmit={this.handleSubmit}>
                                    <FormInput
                                        type="text"
                                        label={t('buildingSite.fields.name')}
                                        required
                                        error={this.state.errors.name}
                                        name="name"
                                        placeholder="2-60 znaków"
                                        onChange={this.handleChange}
                                        value={this.state.buildingSite.name}
                                    />
                                    <FormInput
                                        type="number"
                                        label={t('buildingSite.fields.budget')}
                                        required
                                        error={this.state.errors.budget}
                                        name="budget"
                                        placeholder="2-60 znaków"
                                        onChange={this.handleChange}
                                        value={this.state.buildingSite.budget}
                                    />
                                    <FormInput
                                        type="date"
                                        label={t('buildingSite.fields.startDate')}
                                        required
                                        error={this.state.errors.startDate}
                                        name="startDate"
                                        placeholder="2-60 znaków"
                                        onChange={this.handleChange}
                                        value={this.state.buildingSite.startDate}
                                    />
                                    <FormInput
                                        type="date"
                                        label={t('buildingSite.fields.endDate')}
                                        error={this.state.errors.endDate}
                                        name="endDate"
                                        placeholder="2-60 znaków"
                                        onChange={this.handleChange}
                                        value={this.state.buildingSite.endDate}
                                    />
                                    <FormSelectAddress
                                        label={t('buildingSite.fields.address')}
                                        error={this.state.errors.endDate}
                                        required
                                        name="addressId"
                                        onChange={this.handleChange}
                                        option={this.state.addresses}
                                        value={this.state.buildingSite.address} />
                                    <FormButtons
                                        formMode={this.state.formMode}
                                        error={globalErrorMessage}
                                        cancelPath="/buildingSites"
                                    />

                                </form>
            </main>
        )
    }
}
export default withTranslation()(BuildingSiteForm)