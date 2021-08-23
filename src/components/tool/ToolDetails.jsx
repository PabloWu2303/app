import React from 'react'
import { Link } from 'react-router-dom'
import { getToolByIdApiCall } from '../../apiCalls/toolsApiCalls'
import ToolDetailsData from './ToolDetailsData'
import { withTranslation } from 'react-i18next';

class ToolDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { toolId } = props.match.params
    this.state = {
        toolId: toolId,
        tool: null,
        error: null,
        isLoaded: false,
        message: null
    }
    toolId = parseInt(toolId)
    }

    fetchToolDetails = () => {
        getToolByIdApiCall(this.state.toolId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            tool: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            tool: data,
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
        this.fetchToolDetails()
    }

    render() {
        const { tool, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ToolDetailsData toolData={tool} />
        }
        return (
            <main>
                <h2>{t('tool.details.title')}</h2>
                <div className="section-buttons">
                    <Link to="/tools" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
            </main>
        )
    }
}

export default withTranslation()(ToolDetails)