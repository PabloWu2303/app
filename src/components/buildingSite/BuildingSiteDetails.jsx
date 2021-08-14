import React from 'react'
import { Link } from 'react-router-dom'
import { getBuildingSiteByIdApiCall } from '../../apiCalls/buildingSitesApiCalls'
import BuildingSiteDetailsData from './BuildingSiteDetailsData'
import { withTranslation } from 'react-i18next';
import EmploymentListTable from '../employment/EmploymentListTable';
import { getEmploymentsApiCall } from '../../apiCalls//employmentsApiCalls'

class BuildingSiteDetails extends React.Component {
    constructor(props) {
        super(props)
        let { buildingSiteId } = props.match.params
        this.state = {
            buildingSiteId: buildingSiteId,
            buildingSite: null,
            error: null,
            isLoaded: false,
            message: null,
            employments: []
        }
        buildingSiteId = parseInt(buildingSiteId)
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
        this.fetchBuildingSiteDetails()
        this.fetchEmploymentsList()
    }

    render() {
        const { buildingSiteId, buildingSite, error, isLoaded, message, employments } = this.state
        let content;
        const { t } = this.props;
        const parameter = "bld" + buildingSiteId

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <BuildingSiteDetailsData buildingSiteData={buildingSite} />
        }
        return (
            <main>
                <table className="table-details">
                    <thead>
                        <tr>
                            <th><h2>{t('buildingSite.form.details.pageTitle')}</h2></th>
                            <th><div className="section-buttons">
                                <Link to={`/employments/add/${parameter}`} className="button-edit">{t('form.actions.addEmployment')}</Link>
                            </div></th>
                        </tr></thead>
                </table>
                <div className="section-buttons">
                    <Link to="/buildingSites" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
                {content}
                <h3>{t('employment.form.details.pageTitle')}</h3>
                <EmploymentListTable employmentList = {employments} />
            </main>
        )
    }
}

export default withTranslation()(BuildingSiteDetails)