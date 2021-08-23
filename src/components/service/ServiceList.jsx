import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getServicesApiCall } from '../../apiCalls/servicesApiCalls'
import ServiceListTable from './ServiceListTable'

class ServiceList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            services: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchServicesList()
    }

    fetchServicesList = () => {
        getServicesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        services: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { t } = this.props;
        const { error, isLoaded, services } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <ServiceListTable servicesList={services} />
        }

        return (
            <main>
                <h2>{t('service.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/services/add" className="list-actions-button-add">{t('service.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(ServiceList)