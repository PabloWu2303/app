import React from 'react'
import { Link } from 'react-router-dom'
import { getServiceByIdApiCall } from '../../apiCalls/servicesApiCalls'
import ServiceDetailsData from './ServiceDetailsData'
import { withTranslation } from 'react-i18next';

class ServiceDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { serviceId } = props.match.params
    this.state = {
        serviceId: serviceId,
        service: null,
        error: null,
        isLoaded: false,
        message: null
    }
    serviceId = parseInt(serviceId)
    }

    fetchServiceDetails = () => {
        getServiceByIdApiCall(this.state.serviceId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            service: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            service: data,
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
        this.fetchServiceDetails()
    }

    render() {
        const { service, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ServiceDetailsData serviceData={service} />
        }
        return (
            <main>
                <h2>{t('service.details.title')}</h2>
                <div className="section-buttons">
                    <Link to="/services" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(ServiceDetails)