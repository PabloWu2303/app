import React from "react"
import { getMaterialsApiCall } from '../../apiCalls/materialsApiCalls'
import FormSelectMaterial from '../../form/FormSelectMaterial'
import FormInput from '../../form/FormInput'
import formMode from '../../helpers/formHelper'
import { withTranslation } from 'react-i18next';
import { checkRequired, checkIfDoubleFormat } from '../../helpers/validationCommon'
import FormButtons from "../../form/FormButtons";

class MaterialOrderForm extends React.Component {

    constructor(props) {
        super(props)
      //  const onOrderMaterialId = props.match.params.onOrderMaterialId

        var currentFormMode = formMode.NEW

        this.state = {
            material: '',
            materials: [],
            materialsOnOrder: {
                material: '',
                quantity: ''
            },
            formMode: currentFormMode,
            errors: {
                startDate: '',
                endDate: ''
            },
        }
    }

    componentDidMount() {
        this.fetchMaterialsApiCall()
    }

    fetchMaterialsApiCall = () => {
        getMaterialsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        materials: data
                    });
                }
            )
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
                // promise = addBuildingSiteApiCall(buildingSite)

                const buildingSiteId = this.state.buildingSiteId
                // promise = updateBuildingSiteApiCall(buildingSiteId, buildingSite)
            
        }
    }
    validateForm = () => {
        const employment = this.state.employment
        const errors = this.state.errors
        for (const fieldName in employment) {
            const fieldValue = employment[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'quantity') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkIfDoubleFormat(fieldValue)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
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

        const { t } = this.props;

        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <FormSelectMaterial
                    label={t('onOrderMaterial.fields.material')}
                    required
                    name="material"
                    onChange={this.handleChange}
                    option={this.state.materials} />
                <FormInput
                    type="number"
                    label={t('onOrderMaterial.fields.quantity')}
                    required
                    //      error={this.state.errors.quantity}
                    name="quantity"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                //  value={this.state.employment.quantity}
                />
                <div className="form-buttons">
                    <p id="errorsSummary" className="errors-text">{this.error}</p>
                    <input className="material-add-to-order" type="submit" value={t('onOrderMaterial.buttons.add')} />
                    {/* <Link to={props.cancelPath} className="list-actions-button">Anuluj</Link> */}
                </div>
            </form>
        )
    }

}

export default withTranslation()(MaterialOrderForm)