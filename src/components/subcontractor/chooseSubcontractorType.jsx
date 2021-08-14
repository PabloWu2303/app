import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';

class chooseSubcontractorType extends React.Component {
    render() {

        const { t } = this.props;

        return (
            <main>
                <h2>{t('subcontractor.choose.title')}</h2>
                <table className="table-choose">
                    <thead>
                        <tr>
                            <th><p className="section-buttons">
                                <Link to="/subcontractorSuppliers" className="button-edit">{t('subcontractor.choose.supplier')}</Link>
                            </p></th>
                            <th></th>
                            <th><p className="section-buttons">
                                <Link to="/subcontractorContractors" className="button-edit">{t('subcontractor.choose.contractor')}</Link>
                            </p></th>
                        </tr>
                    </thead>
                </table>
            </main>
        )
    }
}
export default withTranslation()(chooseSubcontractorType)