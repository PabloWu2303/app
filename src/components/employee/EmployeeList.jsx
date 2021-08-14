import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getEmployeesApiCall } from '../../apiCalls/employeesApiCalls'
import EmployeeListTable from './EmployeeListTable'

class EmployeeList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            employees: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchEmployeesList()
    }

    fetchEmployeesList = () => {
        getEmployeesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        employees: data
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
        const { error, isLoaded, employees } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie adresów...</p>
        } else {
            content = <EmployeeListTable employeeList={employees} />
        }

        return (
            <main>
                <h2>{t('employee.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/employees/add" className="list-actions-button-add">{t('employee.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(EmployeeList)