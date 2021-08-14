import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getEmploymentsApiCall } from '../../apiCalls/employmentsApiCalls'
import EmploymentListTable from './EmploymentListTable'

class EmploymentList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            employments: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchEmploymentsList()
    }

    fetchEmploymentsList = () => {
        getEmploymentsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        employments: data
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
        const { error, isLoaded, employments } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie adresów...</p>
        } else {
            content = <EmploymentListTable employmentList={employments} />
        }

        return (
            <main>
                <h2>{t('employment.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/employments/add" className="list-actions-button-add">{t('employment.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(EmploymentList)