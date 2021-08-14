import React from "react"
import { Redirect } from "react-router-dom"
import { Link } from 'react-router-dom';
import formMode from '../../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkEmail } from '../../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../../form/FormInput'
import FormButtons from '../../../form/FormButtons'
import FormSelectAddress from '../../../form/FormSelectAddress'
import FormSelectBuildingSite from '../../../form/FormSelectBuildingSite'
import { getMaterialOrderByIdApiCall, addMaterialOrderApiCall, updateMaterialOrderApiCall } from '../../../apiCalls/materialOrdersApiCalls'
import { getAddressesApiCall } from '../../../apiCalls/addressesApiCalls'
import { getBuildingSitesApiCall } from '../../../apiCalls/buildingSitesApiCalls'
import { getSubcontractorsApiCall } from '../../../apiCalls/subcontractorsApiCalls'
import FormSelectSubcontractor from "../../../form/FormSelectSubcontractor";
import FormSelect from "../../../form/FormSelect";
import { getStatusesApiCall, getPaymentMethodsApiCall } from '../../../apiCalls/utilsApiCalls'
import OnOrderMaterialList from '../../onOrderMaterials/OnOrderMaterialList'

class MaterialOrderForm extends React.Component {

    constructor(props) {
        super(props)
        const paramsMaterialOrderId = props.match.params.orderId
        console.log(paramsMaterialOrderId)
        const currentFormMode = paramsMaterialOrderId ? formMode.EDIT : formMode.NEW

        this.state = {
            materialOrderId: paramsMaterialOrderId,
            subcontractors: [],
            buildingSites: [],
            addresses: [],
            statuses: [],
            paymentMethods: [],
            materialOrder: {
                subcontractor: '',
                buildingSite: '',
                registerDate: '',
                status: '',
                paymentMethod: '',
                address: '',
                onOrderMaterials: []
            },
            errors: {
                registerDate: '',
                status: '',
                paymentMethod: '',
                nearingCompletionDateFlag: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        this.fetchAddressesList()
        this.fetchBuildingSitesList()
        this.fetchSubcontractorsList()
        this.fetchStatusesList()
        this.fetchPaymentMethodsList()
        if (currentFormMode === formMode.EDIT) {
            this.fetchMaterialOrderDetails()
        }
    }

    fetchMaterialOrderDetails = () => {
        getMaterialOrderByIdApiCall(this.state.materialOrderId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            materialOrder: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            materialOrder: data,
                            message: null
                        }, () => {
                            console.log(this.state.materialOrder.onOrderMaterials, 'onOrderMaterials');
                            console.log(data, 'onOrderMaterials');
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
                        isLoaded: true,
                        addresses: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    fetchStatusesList = () => {
        getStatusesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        statuses: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    fetchPaymentMethodsList = () => {
        getPaymentMethodsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        paymentMethods: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    fetchBuildingSitesList = () => {
        getBuildingSitesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        buildingSites: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    fetchSubcontractorsList = () => {
        getSubcontractorsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        subcontractors: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleChange = (event) => {
        const { name, value } = event.target
        console.log(this.state.onOrderMaterials)
        const materialOrder = { ...this.state.materialOrder }
        materialOrder[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            materialOrder: materialOrder,
            errors: errors
        })
    }

    handleCallback = (childData) => {
        const materialOrder = { ...this.state.materialOrder }
        materialOrder["onOrderMaterials"] = childData
        this.setState({ materialOrder: materialOrder }, () => console.log(this.state.materialOrder))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            console.log(this.state.materialOrder.onOrderMaterials)
            const
                materialOrder = this.state.materialOrder,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                console.log(materialOrder)
                promise = addMaterialOrderApiCall(materialOrder)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(materialOrder)
                const materialOrderId = this.state.materialOrderId
                promise = updateMaterialOrderApiCall(materialOrderId, materialOrder)
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
        const materialOrder = this.state.materialOrder
        const errors = this.state.errors
        for (const fieldName in materialOrder) {
            const fieldValue = materialOrder[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('materialOrder.notice.new') : t('materialOrder.notice.edit')
            return (
                <Redirect to={{
                    pathname: "/materialOrders",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        console.log(this.state.materialOrder.onOrderMaterials, "render data")
        const onOrderMaterialData = this.state.materialOrder.onOrderMaterials;
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('materialOrder.form.add.pageTitle') : t('materialOrder.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <form className="form" onSubmit={this.handleSubmit}>
                                    <div className="form-buttons">
                                        <Link to={"/materialOrders"} className="list-actions-button-add">Edytuj materiały na zamówieniu</Link>
                                    </div>
                                    <div></div>
                                    <FormSelectBuildingSite
                                        label={t('materialOrder.fields.buildingSite')}
                                        error={this.state.errors.buildingSite}
                                        required
                                        name="buildingSiteId"
                                        onChange={this.handleChange}
                                        option={this.state.buildingSites}
                                        value={this.state.buildingSiteId ? this.state.buildingSiteId : this.state.materialOrder.buildingSite}
                                    />
                                    <FormSelectSubcontractor
                                        label={t('materialOrder.fields.subcontractor')}
                                        error={this.state.errors.subcontractor}
                                        required
                                        name="subcontractorId"
                                        onChange={this.handleChange}
                                        option={this.state.subcontractors}
                                        value={this.state.subcontractorId ? this.state.subcontractorId : this.state.materialOrder.subcontractor}
                                    />
                                    <FormInput
                                        type="date"
                                        label={t('materialOrder.fields.realizationDate')}
                                        required
                                        error={this.state.errors.realizationDate}
                                        name="realizationDate"
                                        placeholder="2-60 znaków"
                                        onChange={this.handleChange}
                                        value={this.state.materialOrder.realizationDate}
                                    />
                                    <FormSelect
                                        label={t('materialOrder.fields.status')}
                                        error={this.state.errors.status}
                                        required
                                        name="status"
                                        onChange={this.handleChange}
                                        option={this.state.statuses}
                                        value={this.state.materialOrder.status ? this.state.materialOrder.status : ""} />
                                    <FormSelect
                                        label={t('materialOrder.fields.paymentMethod')}
                                        error={this.state.errors.paymentMethod}
                                        required
                                        name="paymentMethod"
                                        onChange={this.handleChange}
                                        option={this.state.paymentMethods}
                                        value={this.state.materialOrder.paymentMethod ? this.state.materialOrder.paymentMethod : ""} />
                                    <FormSelectAddress
                                        label={t('materialOrder.fields.address')}
                                        error={this.state.errors.endDate}
                                        required
                                        name="addressId"
                                        onChange={this.handleChange}
                                        option={this.state.addresses}
                                        value={this.state.materialOrder.address}
                                    />
                                    <FormButtons
                                        formMode={this.state.formMode}
                                        error={globalErrorMessage}
                                        cancelPath="/materialOrders"
                                    />
                                </form>
                            </th>
                            <th align="top"><OnOrderMaterialList formMode={this.state.formMode} onOrderMaterials={onOrderMaterialData} parentCallback={this.handleCallback} /></th>
                        </tr>
                    </thead>
                </table>
            </main>
        )
    }
}
export default withTranslation()(MaterialOrderForm)