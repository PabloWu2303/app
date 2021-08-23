import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getBuildingSitesApiCall } from '../../apiCalls/buildingSitesApiCalls'
import BuildingSiteListTable from './BuildingSiteListTable'

class BuildingSiteList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            buildingSites: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchBuildingSitesList()
    }

    fetchBuildingSitesList = () => {
        getBuildingSitesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        buildingSites: data
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
        const { error, isLoaded, buildingSites } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <BuildingSiteListTable buildingSitesList={buildingSites} />
        }

        return (
            <main>
                <h2>{t('buildingSite.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/buildingSites/add" className="list-actions-button-add">{t('buildingSite.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(BuildingSiteList)