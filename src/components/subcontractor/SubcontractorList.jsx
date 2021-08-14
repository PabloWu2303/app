import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getSubcontractorsApiCall } from '../../apiCalls/subcontractorsApiCalls'
import SubcontractorListTable from './SubcontractorListTable'

class SubcontractorList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            subcontractors: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchSubcontractorsList()
    }

    fetchSubcontractorsList = () => {
        getSubcontractorsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        subcontractors: data
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
        const { error, isLoaded, subcontractors } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie adresów...</p>
        } else {
            content = <SubcontractorListTable subcontractorList={subcontractors} />
        }

        return (
            <main>
                <h2>{t('subcontractor.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/subcontractors/add" className="list-actions-button-add">{t('subcontractor.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(SubcontractorList)