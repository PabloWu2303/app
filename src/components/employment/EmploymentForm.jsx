import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange } from '../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../form/FormInput'
import FormButtons from '../../form/FormButtons'
import FormSelectEmployee from '../../form/FormSelectEmployee'
import FormSelectBuildingSite from '../../form/FormSelectBuildingSite'
import { getEmployeesApiCall, getEmployeeByIdApiCall } from '../../apiCalls/employeesApiCalls'
import { getBuildingSitesApiCall, getBuildingSiteByIdApiCall } from '../../apiCalls/buildingSitesApiCalls'
import { getEmploymentByIdApiCall, addEmploymentApiCall, updateEmploymentApiCall } from '../../apiCalls/employmentsApiCalls'

class EmploymentForm extends React.Component {

    constructor(props) {
        super(props)
        const paramsEmploymentId = props.match.params.employmentId
        var string = props.match.params.parameter
        console.log("asd " + string)
        var paramsEmployeeId
        var paramsBuildingSiteId
        var currentFormMode
        if (string === undefined) {
            currentFormMode = (paramsEmploymentId ? formMode.EDIT : formMode.NEW)
        } else {
            currentFormMode = (string.substring(0, 3) === "emp" ? formMode.ADD_EMP : formMode.ADD_BS)
            if (string.substring(0, 3) === "emp") {
                paramsEmployeeId = string.substring(3)
                console.log("pracownik " + paramsEmployeeId)
            } else {
                paramsBuildingSiteId = string.substring(3)
                console.log("budowa " + paramsBuildingSiteId)
            }
        }
        

        this.state = {
            buildingSite: '',
            employee: '',
            employmentId: paramsEmploymentId,
            employeeId: paramsEmployeeId,
            buildingSiteId: paramsBuildingSiteId,
            buildingSites: [],
            employees: [],
            employment: {
                employeeId: paramsEmployeeId,
                buildingSiteId: paramsBuildingSiteId,
                employee: '',
                buildingSite: '',
                startDate: '',
                endDate: ''
            },
            errors: {
                startDate: '',
                endDate: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
        console.log(this.state.employeeId)
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        this.fetchEmployeesList()
        this.fetchBuildingSitesList()
        if (currentFormMode === formMode.EDIT) {
            this.fetchEmploymentDetails()
        }
        if (currentFormMode === formMode.ADD_BS) {
            this.fetchBuildingSiteDetails()
        }
        if (currentFormMode === formMode.ADD_EMP) {
            this.fetchEmployeeDetails()
        }
    }

    fetchBuildingSiteDetails = () => {
        getBuildingSiteByIdApiCall(this.state.buildingSiteId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            buildingSite: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            buildingSite: data,
                            message: null
                        })
                        this.setState({ buildingSiteId: this.state.buildingSite.id })
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

    fetchBuildingSitesList = () => {
        getBuildingSitesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        buildingSites: data
                    });
                }
            )
    }

    fetchEmploymentDetails = () => {
        getEmploymentByIdApiCall(this.state.employmentId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            employment: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            employment: data,
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
                        this.setState({ employeeId: this.state.employee.id })
                        // let items = [...this.state.employment]
                        // let item = [...items[1]]
                        // item.employee
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

    fetchEmployeesList = () => {
        getEmployeesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        employees: data
                    });
                }
            )
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const employment = { ...this.state.employment }
        employment[name] = value
        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            employment: employment,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                employment = this.state.employment,
                currentFormMode = this.state.formMode

            let
                promise,
                response;
            console.log(currentFormMode)
            if (currentFormMode === formMode.NEW || currentFormMode === formMode.ADD_BS || currentFormMode === formMode.ADD_EMP) {
                console.log(employment)
                promise = addEmploymentApiCall(employment)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(employment)
                const employmentId = this.state.employmentId
                promise = updateEmploymentApiCall(employmentId, employment)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            }

        }
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';

        if (fieldName === 'startDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'endDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const employment = this.state.employment
        const errors = this.state.errors
        for (const fieldName in employment) {
            const fieldValue = employment[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }

    render() {
        const { redirect } = this.state
        const { t } = this.props;
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.EDIT ? t('employment.notice.edit') : t('employment.notice.new')
            return (
                <Redirect to={{
                    pathname: "/employments",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const buildingSite = this.state.buildingSite
        const employee = this.state.employee
        const pageTitle = this.state.formMode === formMode.NEW ? t('employment.form.new') :
            (this.state.formMode === formMode.Edit ? t('employment.form.edit') :
                (this.state.formMode === formMode.ADD_BS ? "Nowe zatrudnienie w  '" + buildingSite.name + "'" :
                    "Nowe zatrudnienie dla " + employee.name + " " + employee.surname + ", " + employee.email))
        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <FormSelectBuildingSite
                        label={t('employment.fields.buildingSite')}
                        error={this.state.errors.buildingSite}
                        required
                        name="buildingSiteId"
                        onChange={this.handleChange}
                        option={this.state.buildingSites}
                        value={this.state.buildingSiteId ? this.state.buildingSiteId : this.state.employment.buildingSite}
                        isBSMode={this.state.buildingSiteId ? true : false}
                    />
                    <FormSelectEmployee
                        label={t('employment.fields.employee')}
                        error={this.state.errors.employee}
                        required
                        name="employeeId"
                        onChange={this.handleChange}
                        option={this.state.employees}
                        value={this.state.employeeId ? this.state.employeeId : this.state.employment.employee}
                        isEmpMode={this.state.employeeId ? true : false}
                    />
                    <FormInput
                        type="date"
                        label={t('employment.fields.startDate')}
                        required
                        error={this.state.errors.startDate}
                        name="startDate"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.employment.startDate}
                    />
                    <FormInput
                        type="date"
                        label={t('employment.fields.endDate')}
                        error={this.state.errors.endDate}
                        name="endDate"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.employment.endDate}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath={this.state.formMode === formMode.ADD_BS ? "/buildingSites/details/" + buildingSite.id :
                            (this.state.formMode === formMode.ADD_EMP ? "/employees/details/" + employee.id : "/employments")}
                    />
                </form>
            </main>
        )
    }
}
export default withTranslation()(EmploymentForm)