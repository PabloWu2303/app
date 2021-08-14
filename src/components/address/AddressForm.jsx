import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkHouseNumber } from '../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../form/FormInput'
import FormButtons from '../../form/FormButtons'
import { getAddressByIdApiCall, addAddressApiCall, updateAddressApiCall } from '../../apiCalls/addressesApiCalls'

class AddressForm extends React.Component {

    constructor(props) {
        super(props)
        console.log("asd")
        const paramsAddressId = props.match.params.addressId
        console.log(paramsAddressId)
        const currentFormMode = paramsAddressId ? formMode.EDIT : formMode.NEW

        this.state = {
            addressId: paramsAddressId,
            address: {
                city: '',
                street: '',
                houseNumber: '',
                flatNumber: '',
                postalCode: ''
            },
            errors: {
                city: '',
                street: '',
                houseNumber: '',
                flatNumber: '',
                postalCode: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchAddressDetails()
        }
    }

    fetchAddressDetails = () => {
        getAddressByIdApiCall(this.state.addressId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            address: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            address: data,
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
        const address = { ...this.state.address }
        address[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            address: address,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                address = this.state.address,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addAddressApiCall(address)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(address)
                const addressId = this.state.addressId
                promise = updateAddressApiCall(addressId, address)
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
        if (fieldName === 'city') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'street') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        } 
        if (fieldName === 'houseNumber') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            }else if (!checkHouseNumber(fieldValue)) {
                errorMessage = 'Numer domu powinien zaczynać się cyfrą'
            }
        }
        if (fieldName === 'postalCode') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 6)) {
                errorMessage = 'Pole powinno zawierać od 2 do 6 znaków'
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const address = this.state.address
        const errors = this.state.errors
        for (const fieldName in address) {
            const fieldValue = address[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('address.notice.new') : t('address.notice.edit')
            return (
                <Redirect to={{
                    pathname: "/addresses",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('address.form.add.pageTitle') : t('address.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        console.log(this.state.address)
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                <FormInput
                    type="text"
                    label= {t('address.fields.city')}
                    required
                    error={this.state.errors.city}
                    name="city"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.address.city}
                />
                <FormInput
                    type="text"
                    label={t('address.fields.street')}
                    required
                    error={this.state.errors.street}
                    name="street"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.address.street}
                />
                <FormInput
                    type="text"
                    label={t('address.fields.houseNumber')}
                    required
                    error={this.state.errors.houseNumber}
                    name="houseNumber"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.address.houseNumber}
                />
                <FormInput
                    type="text"
                    label={t('address.fields.flatNumber')}
                    error={this.state.errors.flatNumber}
                    name="flatNumber"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.address.flatNumber}
                />
                <FormInput
                    type="text"
                    label={t('address.fields.postalCode')}
                    required
                    error={this.state.errors.postalCode}
                    name="postalCode"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.address.postalCode}
                />
                <FormButtons
                    formMode={this.state.formMode}
                    error={globalErrorMessage}
                    cancelPath="/addresses"
                />
                </form>
            </main>
        )
    }
}
export default withTranslation()(AddressForm)