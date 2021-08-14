import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getMaterialOrdersApiCall } from '../../../apiCalls/materialOrdersApiCalls'
import MaterialOrderListTable from './MaterialOrderListTable'

class MaterialOrderList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            materialOrders: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchMaterialOrdersList()
    }

    fetchMaterialOrdersList = () => {
        getMaterialOrdersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        materialOrders: data
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
        const { error, isLoaded, materialOrders } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie adresów...</p>
        } else {
            content = <MaterialOrderListTable materialOrderList={materialOrders} />
        }

        return (
            <main>
                <h2>{t('materialOrder.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/materialOrders/add" className="list-actions-button-add">{t('materialOrder.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(MaterialOrderList)