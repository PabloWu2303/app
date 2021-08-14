import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange } from '../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../form/FormInput'
import FormButtons from '../../form/FormButtons'
import FormSelectAddress from '../../form/FormSelectAddress'
import { getAddressesApiCall } from '../../apiCalls/addressesApiCalls'
import { getSubcontractorByIdApiCall, addSubcontractorApiCall, updateSubcontractorApiCall } from '../../apiCalls/subcontractorsApiCalls'

class subcontractorForm extends React.Component {

    constructor(props) {
        super(props)
        const paramssubcontractorId = props.match.params.subcontractorId
        const supplierValue = props.match.params.supplier ? true : false
        const contractorValue = props.match.params.contractor ? true : false
        console.log(paramssubcontractorId)
        const currentFormMode = paramssubcontractorId ? formMode.EDIT : formMode.NEW

        this.onChangeValue = this.onChangeValue.bind(this)

        this.state = {
            subcontractorId: paramssubcontractorId,
            addresses: [],
            supplier: supplierValue,
            contractor: contractorValue,
            subcontractor: {
                name: '',
                nip: '',
                address: '',
                deliveryMethod: '',
                cooperationRate: '',
                supplier: supplierValue,
                contractor: contractorValue,
                materialOrders: [],
                toolOrder: []
            },
            errors: {
                name: '',
                nip: '',
                deliveryMethod: '',
                cooperationRate: ''
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
            this.fetchsubcontractorDetails()
        }
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

    fetchsubcontractorDetails = () => {
        getSubcontractorByIdApiCall(this.state.subcontractorId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            subcontractor: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            subcontractor: data,
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
        const subcontractor = { ...this.state.subcontractor }
        subcontractor[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            subcontractor: subcontractor,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                subcontractor = this.state.subcontractor,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                subcontractor.supplier= this.state.supplier
                subcontractor.contractor= this.state.contractor
                promise = addSubcontractorApiCall(subcontractor)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(subcontractor)
                const subcontractorId = this.state.subcontractorId
                promise = updateSubcontractorApiCall(subcontractorId, subcontractor)
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
        if (fieldName === 'nip') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 9, 9)) {
                errorMessage = 'Pole powinno zawierać 9 znaków'
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const subcontractor = this.state.subcontractor
        const errors = this.state.errors
        for (const fieldName in subcontractor) {
            const fieldValue = subcontractor[fieldName]
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

    onChangeValue(event) {
        if (event.target.value === "Both") {
            this.setState({
                    supplier: true,
                    contractor: true
                
            })
        } else if (event.target.value === "Supplier") {
            this.setState({
                    supplier: true,
                    contractor: false
                
            })
        } else if (event.target.value === "Contractor") {
            this.setState({
                    supplier: false,
                    contractor: true
                
            })
        }
    }

    render() {
        const { redirect } = this.state
        const { t } = this.props;
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('subcontractor.notice.new') : t('subcontractor.notice.edit')
            return (
                <Redirect to={{
                    pathname: "/subcontractors",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('subcontractor.form.add.pageTitle') : t('subcontractor.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        console.log(this.state.subcontractor)
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('subcontractor.fields.name')}
                        required
                        error={this.state.errors.name}
                        name="name"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.subcontractor.name}
                    />
                    <FormInput
                        type="number"
                        label={t('subcontractor.fields.nip')}
                        required
                        error={this.state.errors.nip}
                        name="nip"
                        placeholder="np. 987456321"
                        onChange={this.handleChange}
                        value={this.state.subcontractor.nip}
                    />
                    <FormSelectAddress
                        label={t('subcontractor.fields.address')}
                        error={this.state.errors.endDate}
                        required
                        name="addressId"
                        onChange={this.handleChange}
                        option={this.state.addresses}
                        value={this.state.subcontractor.address} />
                    <FormInput
                        type="text"
                        label={t('subcontractor.fields.deliveryMethod')}
                        required
                        error={this.state.errors.deliveryMethod}
                        name="deliveryMethod"
                        placeholder="np. 987456321"
                        onChange={this.handleChange}
                        value={this.state.subcontractor.deliveryMethod}
                    />
                    <input className="input-field" type="radio" value="Supplier" name="gender" checked={this.state.supplier && !this.state.contractor} onChange={this.onChangeValue} />Supplier<p />
                    <input className="input-field" type="radio" value="Contractor" name="gender " checked={!this.state.supplier && this.state.contractor} onChange={this.onChangeValue} />Contractor<p />
                    <input className="input-field" type="radio" value="Both" checked={this.state.supplier && this.state.contractor} name="gender" onChange={this.onChangeValue} />Both<p />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/subcontractors"
                    />

                </form>
            </main>
        )
    }
}
export default withTranslation()(subcontractorForm)