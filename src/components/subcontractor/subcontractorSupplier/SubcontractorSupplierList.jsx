import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getSubcontractorSuppliersApiCall } from '../../../apiCalls/subcontractorSuppliersApiCalls'
import SubcontractorSupplierListTable from './SubcontractorSupplierListTable'

class SubcontractorSupplierList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            subcontractorSuppliers: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchSubcontractorSuppliersList()
    }

    fetchSubcontractorSuppliersList = () => {
        getSubcontractorSuppliersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        subcontractorSuppliers: data
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
        const { error, isLoaded, subcontractorSuppliers } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <SubcontractorSupplierListTable subcontractorSupplierList={subcontractorSuppliers} />
        }

        return (
            <main>
                <h2>{t('subcontractorSupplier.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/subcontractorSuppliers/add" className="list-actions-button-add">{t('subcontractorSupplier.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(SubcontractorSupplierList)