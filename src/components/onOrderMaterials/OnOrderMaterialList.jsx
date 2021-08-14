import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
//import { getOnOrderMaterialsApiCall } from '../../apiCalls/onOrderMaterialsApiCalls'
import OnOrderMaterialListTable from './OnOrderMaterialListTable'
import OnOrderMaterialToChoose from './OnOrderMaterialToChoose'
import { getMaterialsApiCall } from '../../apiCalls/materialsApiCalls'
import FormSelectMaterial from '../../form/FormSelectMaterial'
import formMode from '../../helpers/formHelper'
import FormInput from '../../form/FormInput'
import { checkRequired, checkIfOnlyNumbers } from '../../helpers/validationCommon'

class OnOrderMaterialList extends React.Component {
    constructor(props) {
        super(props)
        var currentFormMode = props.currentFormMode
        console.log("props data " + props.onOrderMaterials)
        //    let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            lastId: 1,
            material: '', 
            // {
            //     name: '',
            //     quantity: ''
            // },
            materials: [],
            // onOrderMaterial: {
            //     id: '',
            //     material: '',
            //     quantity: ''
            // },
            onOrderMaterials: currentFormMode === formMode.EDIT ? props.onOrderMaterials : [],
            // ,
            // notice: notice
            formMode: currentFormMode,
            errors: {
                quantity: '',
                name: ''
            },
            error: null
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

    // fetchOnOrderMaterialsList = () => {
    //     getOnOrderMaterialsApiCall()
    //         .then(res => res.json())
    //         .then(
    //             (data) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     onOrderMaterials: data
    //                 });
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )
    // }


    handleChange = (event) => {
        const { name, value } = event.target
        const material = { ...this.state.material }
        material[name] = value
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
            const onOrderMaterial = { ...this.state.onOrderMaterial }
            const materialId = event.target.material.value;
            console.log(this.state.materials)
            const material = this.state.materials.find(material => material.id.toString() === materialId.toString())
            console.log(material)
            const quantitya = event.target.quantity.value;
            console.log(materialId, quantitya)
            onOrderMaterial["id"] = this.state.lastId
            onOrderMaterial["materialId"] = material.id
            onOrderMaterial["material"] = material
            onOrderMaterial["quantity"] = quantitya
            this.setState({ lastId: this.state.lastId + 1 })
            this.setState({ onOrderMaterial: onOrderMaterial }, () => {
                console.log(this.state.onOrderMaterial, 'onOrderMaterial');
                this.setState({ onOrderMaterials: this.state.onOrderMaterials.concat(this.state.onOrderMaterial) }, () => {
                    console.log(this.state.onOrderMaterials, 'lista');
                    this.props.parentCallback(this.state.onOrderMaterials);
                    event.preventDefault();
                })
            })

            this.setState({ isLoaded: true })
            // this.onTrigger(event)
            // this.props.parentCallback(this.state.onOrderMaterials);
            // event.preventDefault();
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
            } else if (!checkIfOnlyNumbers(fieldValue)) {
                errorMessage = 'Wymagany format np. 2.00'
            }
        }
        return errorMessage
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

    removeMaterial = (event, onOrderMaterial) => {
        const items = this.state.onOrderMaterials.filter(item => item !== onOrderMaterial)
        this.setState({ onOrderMaterials: items })
    }

    render() {
        const { t } = this.props;
        const { error, isLoaded, onOrderMaterials } = this.state
        let content;


        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else {
            content = <><table className="table-list">
                <thead>
                    <tr>
                        <th>{t('onOrderMaterial.fields.name')}</th>
                        <th>{t('onOrderMaterial.fields.unitPrice')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {onOrderMaterials.map(onOrderMaterial =>
                        <tr>
                            <td>{onOrderMaterial.material.name + " " + onOrderMaterial.material.unitPrice + " PLN"}</td>
                            <td>{onOrderMaterial.quantity}</td><td>
                                <ul className="list-actions">
                                    <li><button onClick={event => this.removeMaterial(event, onOrderMaterial)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                                </ul>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table></>
        }

        return (
            <main>
                <h2>{t('onOrderMaterial.list.title')}</h2>
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
                        error={this.state.errors.quantity}
                        name="quantity"
                        placeholder="Wymagany format np. 2.00"
                        onChange={this.handleChange}
                    //  value={this.state.employment.quantity}
                    />
                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text">{this.error}</p>
                        <input className="material-add-to-order" type="submit" value={t('onOrderMaterial.buttons.add')} />
                        {/* <Link to={props.cancelPath} className="list-actions-button">Anuluj</Link> */}
                    </div>
                </form>
                {content}
            </main>
        )
    }
}
export default withTranslation()(OnOrderMaterialList)