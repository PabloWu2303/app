import React from 'react'
import { Link } from 'react-router-dom'
import { getToolOrderByIdApiCall } from '../../../apiCalls/toolOrdersApiCalls'
import ToolOrderDetailsData from './ToolOrderDetailsData'
import { withTranslation } from 'react-i18next';

class ToolOrderDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { toolOrderId } = props.match.params
    console.log(toolOrderId)
    this.state = {
        toolOrderId: toolOrderId,
        toolOrder: null,
        error: null,
        isLoaded: false,
        message: null
    }
    toolOrderId = parseInt(toolOrderId)
    }

    fetchToolOrderDetails = () => {
        getToolOrderByIdApiCall(this.state.toolOrderId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            toolOrder: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            toolOrder: data,
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
        this.fetchToolOrderDetails()
    }

    render() {
        const { toolOrderId, toolOrder, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
        const parameter = "emp" + toolOrderId
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ToolOrderDetailsData toolOrderData={toolOrder} />
        }
        return (
            <main>
                <h2>{t('toolOrder.details.title')}</h2>
                <div className="section-buttons">
                    <Link to={`/employments/add/${parameter}`} className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                <div className="section-buttons">
                    <Link to="/toolOrders" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(ToolOrderDetails)