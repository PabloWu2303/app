import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getSubcontractorContractorsApiCall } from '../../../apiCalls/subcontractorContractorsApiCalls'
import SubcontractorContractorListTable from './SubcontractorContractorListTable'

class SubcontractorContractorList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            subcontractorContractors: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchSubcontractorContractorsList()
    }

    fetchSubcontractorContractorsList = () => {
        getSubcontractorContractorsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        subcontractorContractors: data
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
        const { error, isLoaded, subcontractorContractors } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <SubcontractorContractorListTable subcontractorContractorList={subcontractorContractors} />
        }

        return (
            <main>
                <h2>{t('subcontractorContractor.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/subcontractorContractors/add" className="list-actions-button-add">{t('subcontractorContractor.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(SubcontractorContractorList)