import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkEmail } from '../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../form/FormInput'
import FormButtons from '../../form/FormButtons'
import { getEmployeeByIdApiCall, addEmployeeApiCall, updateEmployeeApiCall } from '../../apiCalls/employeesApiCalls'

class EmployeeForm extends React.Component {

    constructor(props) {
        super(props)
        console.log("asd")
        const paramsEmployeeId = props.match.params.employeeId
        console.log(paramsEmployeeId)
        const currentFormMode = paramsEmployeeId ? formMode.EDIT : formMode.NEW

        this.state = {
            employeeId: paramsEmployeeId,
            employee: {
                name: '',
                surname: '',
                mobile: '',
                email: '',
                workplace: ''
            },
            errors: {
                name: '',
                surname: '',
                mobile: '',
                email: '',
                workplace: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchEmployeeDetails()
        }
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

    handleChange = (event) => {
        const { name, value } = event.target
        const employee = { ...this.state.employee }
        employee[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            employee: employee,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                employee = this.state.employee,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addEmployeeApiCall(employee)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(employee)
                const employeeId = this.state.employeeId
                promise = updateEmployeeApiCall(employeeId, employee)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data
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
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'surname') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        } 
        if (fieldName === 'mobile') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'workplace') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkTextLengthRange(fieldValue)) {
                errorMessage = "Pole powinno zawierać od 5 do 60 znaków";
            } else if (!checkEmail(fieldValue)) {
                errorMessage = "Pole powinno zawierać prawidłowy adres email";
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const employee = this.state.employee
        const errors = this.state.errors
        for (const fieldName in employee) {
            const fieldValue = employee[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('employee.notice.new') : t('employee.notice.edit')
            return (
                <Redirect to={{
                    pathname: "/employees",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('employee.form.add.pageTitle') : t('employee.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        console.log(this.state.employee)
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                <FormInput
                    type="text"
                    label= {t('employee.fields.name')}
                    required
                    error={this.state.errors.name}
                    name="name"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.employee.name}
                />
                <FormInput
                    type="text"
                    label={t('employee.fields.surname')}
                    required
                    error={this.state.errors.surname}
                    name="surname"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.employee.surname}
                />
                <FormInput
                    type="number"
                    label={t('employee.fields.mobile')}
                    required
                    error={this.state.errors.mobile}
                    name="mobile"
                    placeholder="np. 987456321"
                    onChange={this.handleChange}
                    value={this.state.employee.mobile}
                />
                <FormInput
                    type="text"
                    label={t('employee.fields.email')}
                    error={this.state.errors.email}
                    name="email"
                    placeholder="example@mail.com"
                    onChange={this.handleChange}
                    value={this.state.employee.email}
                />
                <FormInput
                    type="text"
                    label={t('employee.fields.workplace')}
                    required
                    error={this.state.errors.workplace}
                    name="workplace"
                    placeholder="2-60 znaków"
                    onChange={this.handleChange}
                    value={this.state.employee.workplace}
                />
                <FormButtons
                    formMode={this.state.formMode}
                    error={globalErrorMessage}
                    cancelPath="/employees"
                />
                </form>
            </main>
        )
    }
}
export default withTranslation()(EmployeeForm)