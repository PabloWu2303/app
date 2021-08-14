import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getToolOrdersApiCall } from '../../../apiCalls/toolOrdersApiCalls'
import ToolOrderListTable from './ToolOrderListTable'

class ToolOrderList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            toolOrders: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchToolOrdersList()
    }

    fetchToolOrdersList = () => {
        getToolOrdersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        toolOrders: data
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
        const { error, isLoaded, toolOrders } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie adresów...</p>
        } else {
            content = <ToolOrderListTable toolOrderList={toolOrders} />
        }

        return (
            <main>
                <table className="table-details">
                    <thead>
                        <tr>
                            <th><h2>{t('toolOrder.list.title')}</h2></th>
                            <th><div className="section-buttons">
                                <Link to={`/orders`} className="button-edit">{t('form.actions.return')}</Link>
                            </div></th>
                        </tr>
                    </thead>
                </table>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/toolOrders/add" className="list-actions-button-add">{t('toolOrder.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(ToolOrderList)