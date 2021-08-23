import React from 'react'
import { Link } from 'react-router-dom'
import { getSubcontractorSupplierByIdApiCall } from '../../../apiCalls/subcontractorsApiCalls'
import SubcontractorSupplierDetailsData from './SubcontractorSupplierDetailsData'
import { withTranslation } from 'react-i18next';

class SubcontractorSupplierDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { subcontractorSupplierId } = props.match.params
    console.log(subcontractorSupplierId)
    this.state = {
        subcontractorSupplierId: subcontractorSupplierId,
        subcontractorSupplier: null,
        error: null,
        isLoaded: false,
        message: null
    }
    subcontractorSupplierId = parseInt(subcontractorSupplierId)
    }

    fetchSubcontractorSupplierDetails = () => {
        getSubcontractorSupplierByIdApiCall(this.state.subcontractorSupplierId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            subcontractorSupplier: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            subcontractorSupplier: data,
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
        this.fetchSubcontractorSupplierDetails()
    }

    render() {
        const { subcontractorSupplierId, subcontractorSupplier, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
        const parameter = "emp" + subcontractorSupplierId
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <SubcontractorSupplierDetailsData subcontractorSupplierData={subcontractorSupplier} />
        }
        return (
            <main>
                <h2>{t('subcontractorSupplier.details.title')}</h2>
                <div className="section-buttons">
                    <Link to={`/employments/add/${parameter}`} className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                <div className="section-buttons">
                    <Link to="/subcontractorSuppliers" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(SubcontractorSupplierDetails)