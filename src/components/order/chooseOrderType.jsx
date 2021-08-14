import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';

class ChooseOrderType extends React.Component {
    render() {

        const { t } = this.props;

        return (
            <main>
                <h2>{t('order.choose.title')}</h2>
                <table className="table-choose">
                    <thead>
                        <tr>
                            <th><p className="section-buttons">
                                <Link to="/materialOrders" className="button-edit">{t('order.choose.material')}</Link>
                            </p></th>
                            <th><p className="section-buttons">
                                <Link to="/serviceOrders" className="button-edit">{t('order.choose.service')}</Link>
                            </p></th>
                            <th><p className="section-buttons">
                                <Link to="/toolOrders" className="button-edit">{t('order.choose.tool')}</Link>
                            </p></th>
                        </tr>
                    </thead>
                </table>
            </main>
        )
    }
}
export default withTranslation()(ChooseOrderType)