import React from 'react'
import { Link } from 'react-router-dom'
import { getServiceOrderByIdApiCall } from '../../../apiCalls/serviceOrdersApiCalls'
import ServiceOrderDetailsData from './ServiceOrderDetailsData'
import { withTranslation } from 'react-i18next';

class ServiceOrderDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { serviceOrderId } = props.match.params
    console.log(serviceOrderId)
    this.state = {
        serviceOrderId: serviceOrderId,
        serviceOrder: null,
        error: null,
        isLoaded: false,
        message: null
    }
    serviceOrderId = parseInt(serviceOrderId)
    }

    fetchServiceOrderDetails = () => {
        getServiceOrderByIdApiCall(this.state.serviceOrderId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            serviceOrder: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            serviceOrder: data,
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
        this.fetchServiceOrderDetails()
    }

    render() {
        const { serviceOrderId, serviceOrder, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
        const parameter = "emp" + serviceOrderId
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ServiceOrderDetailsData serviceOrderData={serviceOrder} />
        }
        return (
            <main>
                <h2>{t('serviceOrder.details.title')}</h2>
                <div className="section-buttons">
                    <Link to={`/employments/add/${parameter}`} className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                <div className="section-buttons">
                    <Link to="/serviceOrders" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(ServiceOrderDetails)