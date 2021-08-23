import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getToolsApiCall } from '../../apiCalls/toolsApiCalls'
import ToolListTable from './ToolListTable'

class ToolList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            tools: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchToolsList()
    }

    fetchToolsList = () => {
        getToolsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        tools: data
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
        const { error, isLoaded, tools } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <ToolListTable toolsList={tools} />
        }

        return (
            <main>
                <h2>{t('tool.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/tools/add" className="list-actions-button-add">{t('tool.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(ToolList)