import React from 'react'
import { Link } from 'react-router-dom'
import { getEmploymentByIdApiCall } from '../../apiCalls/employmentsApiCalls'
import EmploymentDetailsData from './EmploymentDetailsData'
import { withTranslation } from 'react-i18next';

class EmploymentDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { employmentId } = props.match.params
    console.log(employmentId)
    this.state = {
        employmentId: employmentId,
        employment: null,
        error: null,
        isLoaded: false,
        message: null
    }
    employmentId = parseInt(employmentId)
    }

    fetchEmploymentDetails = () => {
        getEmploymentByIdApiCall(this.state.employmentId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            employment: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            employment: data,
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
        this.fetchEmploymentDetails()
    }

    render() {
        const { employment, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <EmploymentDetailsData employmentData={employment} />
        }
        return (
            <main>
                <h2>{t('employment.details.title')}</h2>
                <div className="section-buttons">
                    <Link to="/employments" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(EmploymentDetails)