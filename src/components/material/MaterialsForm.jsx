import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange , checkIfOnlyNumbers } from '../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../form/FormInput'
import FormButtons from '../../form/FormButtons'
import { getMaterialByIdApiCall, addMaterialApiCall, updateMaterialApiCall } from '../../apiCalls/materialsApiCalls'

class MaterialForm extends React.Component {

    constructor(props) {
        super(props)
        const paramsMaterialId = props.match.params.materialId
        const currentFormMode = paramsMaterialId ? formMode.EDIT : formMode.NEW

        this.state = {
            materialId: paramsMaterialId,
            addresses: [],
            material: {
                name: '',
                unitPrice: ''
            },
            errors: {
                name: '',
                unitPrice: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchMaterialDetails()
        }
    }

    fetchMaterialDetails = () => {
        getMaterialByIdApiCall(this.state.materialId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            material: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            material: data,
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
        const material = { ...this.state.material }
        material[name] = value
console.log(name, value)
        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            material: material,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                material = this.state.material,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addMaterialApiCall(material)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(material)
                const materialId = this.state.materialId
                promise = updateMaterialApiCall(materialId, material)
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
        if (fieldName === 'unitPrice') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            }else if (!checkIfOnlyNumbers(fieldValue)) {
                errorMessage = 'Wymagany odpowiedni format, np. 2.00. Dopuszczalne tylko cyfry'
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const material = this.state.material
        const errors = this.state.errors
        for (const fieldName in material) {
            const fieldValue = material[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('material.notice.new') : t('material.notice.edit')
            return (
                <Redirect to={{
                    pathname: "/materials",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('material.form.new') : t('material.form.edit')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('material.fields.name')}
                        required
                        error={this.state.errors.name}
                        name="name"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.material.name}
                    />
                    <FormInput
                        type="double"
                        label={t('material.fields.unitPrice')}
                        required
                        error={this.state.errors.unitPrice}
                        name="unitPrice"
                        onChange={this.handleChange}
                        value={this.state.material.unitPrice}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/materials"
                    />
                </form>
            </main>
        )
    }
}
export default withTranslation()(MaterialForm)