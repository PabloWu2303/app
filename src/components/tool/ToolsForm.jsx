import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange } from '../../helpers/validationCommon'
import { withTranslation } from 'react-i18next';
import FormInput from '../../form/FormInput'
import FormButtons from '../../form/FormButtons'
import { getToolByIdApiCall, addToolApiCall, updateToolApiCall } from '../../apiCalls/toolsApiCalls'

class ToolForm extends React.Component {

    constructor(props) {
        super(props)
        const paramsToolId = props.match.params.toolId
        const currentFormMode = paramsToolId ? formMode.EDIT : formMode.NEW

        this.state = {
            toolId: paramsToolId,
            addresses: [],
            tool: {
                name: '',
                purpose: ''            },
            errors: {
                name: '',
                purpose: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchToolDetails()
        }
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

    handleChange = (event) => {
        const { name, value } = event.target
        const tool = { ...this.state.tool }
        tool[name] = value
        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            tool: tool,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                tool = this.state.tool,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addToolApiCall(tool)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(tool)
                const toolId = this.state.toolId
                promise = updateToolApiCall(toolId, tool)
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
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'purpose') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const tool = this.state.tool
        const errors = this.state.errors
        for (const fieldName in tool) {
            const fieldValue = tool[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('tool.notice.new') : t('tool.notice.edit')
            return (
                <Redirect to={{
                    pathname: "/tools",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('tool.form.new') : t('tool.form.edit')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('tool.fields.name')}
                        required
                        error={this.state.errors.name}
                        name="name"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.tool.name}
                    />
                    <FormInput
                        type="text"
                        label={t('tool.fields.purpose')}
                        required
                        error={this.state.errors.purpose}
                        name="purpose"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.tool.purpose}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/tools"
                    />
                </form>
            </main>
        )
    }
}
export default withTranslation()(ToolForm)