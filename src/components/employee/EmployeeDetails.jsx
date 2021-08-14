import React from 'react'
import { Link } from 'react-router-dom'
import { getEmployeeByIdApiCall } from '../../apiCalls/employeesApiCalls'
import EmployeeDetailsData from './EmployeeDetailsData'
import { withTranslation } from 'react-i18next';
import EmploymentListTable from '../employment/EmploymentListTable';
import { getEmploymentsApiCall } from '../../apiCalls//employmentsApiCalls'

class EmployeeDetails extends React.Component {
    constructor(props) {
        super(props)
        let { employeeId } = props.match.params
        console.log(employeeId)
        this.state = {
            employeeId: employeeId,
            employee: null,
            error: null,
            isLoaded: false,
            message: null,
            employments: []
        }
        employeeId = parseInt(employeeId)
    }

    fetchEmployeeDetails = () => {
        getEmployeeByIdApiCall(this.state.employeeId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            employee: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            employee: data,
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

    fetchEmploymentsList = () => {
        getEmploymentsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        employments: data
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchEmployeeDetails()
        this.fetchEmploymentsList()
    }

    render() {
        const { employeeId, employee, error, isLoaded, message, employments } = this.state
        let content;
        const { t } = this.props;
        const parameter = "emp" + employeeId

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <EmployeeDetailsData employeeData={employee} />
        }
        return (
            <main>
                <table className="table-details">
                    <thead>
                        <tr>
                            <th><h2>{t('employee.details.title')}</h2></th>
                            <th><div className="section-buttons">
                                <Link to={`/employments/add/${parameter}`} className="button-edit">{t('form.actions.addEmployment')}</Link>
                            </div></th>
                        </tr></thead>
                </table>
                <div className="section-buttons">
                    <Link to="/employees" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
                <h3>{t('employment.form.details.pageTitle')}</h3>
                <EmploymentListTable employmentList = {employments} />
            </main>
        )
    }
}

export default withTranslation()(EmployeeDetails)