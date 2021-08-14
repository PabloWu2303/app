import React from 'react'
import { Link } from 'react-router-dom'
import { getSubcontractorByIdApiCall } from '../../apiCalls/subcontractorsApiCalls'
import SubcontractorDetailsData from './SubcontractorDetailsData'
import { withTranslation } from 'react-i18next';

class SubcontractorDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { subcontractorId } = props.match.params
    console.log(subcontractorId)
    this.state = {
        subcontractorId: subcontractorId,
        subcontractor: null,
        error: null,
        isLoaded: false,
        message: null
    }
    subcontractorId = parseInt(subcontractorId)
    }

    fetchSubcontractorDetails = () => {
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

    componentDidMount() {
        this.fetchSubcontractorDetails()
    }

    render() {
        const { subcontractorId, subcontractor, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
        const parameter = "emp" + subcontractorId
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <SubcontractorDetailsData subcontractorData={subcontractor} />
        }
        return (
            <main>
                <h2>{t('subcontractor.details.title')}</h2>
                <div className="section-buttons">
                    <Link to={`/employments/add/${parameter}`} className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                <div className="section-buttons">
                    <Link to="/subcontractors" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(SubcontractorDetails)