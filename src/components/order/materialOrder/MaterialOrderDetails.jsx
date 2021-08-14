import React from 'react'
import { Link } from 'react-router-dom'
import { getMaterialOrderByIdApiCall } from '../../../apiCalls/materialOrdersApiCalls'
import MaterialOrderDetailsData from './MaterialOrderDetailsData'
import { withTranslation } from 'react-i18next';

class MaterialOrderDetails extends React.Component {
    constructor(props) {
        super(props)
        let { orderId } = props.match.params
        console.log(props.match.params)
        this.state = {
            orderId: orderId,
            materialOrder: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }
    fetchMaterialOrderDetails = () => {
        getMaterialOrderByIdApiCall(this.state.orderId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            materialOrder: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            materialOrder: data,
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
        this.fetchMaterialOrderDetails()
    }

    render() {
        const { materialOrder, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            console.log(materialOrder)
            content = <MaterialOrderDetailsData materialOrderData={materialOrder} />
        }
        return (
            <main>
                <h2>{t('materialOrder.details.title')}</h2>
                <div className="section-buttons">
                    <Link to="/materialOrders" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(MaterialOrderDetails)