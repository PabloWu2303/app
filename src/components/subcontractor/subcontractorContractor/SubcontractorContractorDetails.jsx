import React from 'react'
import { Link } from 'react-router-dom'
import { getSubcontractorContractorByIdApiCall } from '../../../apiCalls/subcontractorContractorsApiCalls'
import SubcontractorContractorDetailsData from './SubcontractorContractorDetailsData'
import { withTranslation } from 'react-i18next';

class SubcontractorContractorDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { subcontractorContractorId } = props.match.params
    console.log(subcontractorContractorId)
    this.state = {
        subcontractorContractorId: subcontractorContractorId,
        subcontractorContractor: null,
        error: null,
        isLoaded: false,
        message: null
    }
    subcontractorContractorId = parseInt(subcontractorContractorId)
    }

    fetchSubcontractorContractorDetails = () => {
        getSubcontractorContractorByIdApiCall(this.state.subcontractorContractorId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            subcontractorContractor: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            subcontractorContractor: data,
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
        this.fetchSubcontractorContractorDetails()
    }

    render() {
        const { subcontractorContractorId, subcontractorContractor, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
        const parameter = "emp" + subcontractorContractorId
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <SubcontractorContractorDetailsData subcontractorContractorData={subcontractorContractor} />
        }
        return (
            <main>
                <h2>{t('subcontractorContractor.details.title')}</h2>
                <div className="section-buttons">
                    <Link to={`/employments/add/${parameter}`} className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                <div className="section-buttons">
                    <Link to="/subcontractorContractors" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(SubcontractorContractorDetails)