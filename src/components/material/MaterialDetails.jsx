import React from 'react'
import { Link } from 'react-router-dom'
import { getMaterialByIdApiCall } from '../../apiCalls/materialsApiCalls'
import MaterialDetailsData from './MaterialDetailsData'
import { withTranslation } from 'react-i18next';

class MaterialDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { materialId } = props.match.params
    this.state = {
        materialId: materialId,
        material: null,
        error: null,
        isLoaded: false,
        message: null
    }
    materialId = parseInt(materialId)
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

    componentDidMount() {
        this.fetchMaterialDetails()
    }

    render() {
        const { materialId, material, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
        const parameter = "bld" + materialId
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych materialu</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <MaterialDetailsData materialData={material} />
        }
        return (
            <main>
                <h2>{t('material.details.title')}</h2>
                <div className="section-buttons">
                    <Link to={`/employments/add/${parameter}`} className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                <div className="section-buttons">
                    <Link to="/materials" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(MaterialDetails)