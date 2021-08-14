import React from 'react';
import MaterialOrderListTableRow from './MaterialOrderListTableRow'
import { useTranslation } from 'react-i18next';

function MaterialOrderListTable(props) {
    const materialOrders = props.materialOrderList
    const { t } = useTranslation();
    console.log(materialOrders)
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('materialOrder.fields.buildingSite')}</th>
                    <th>{t('materialOrder.fields.subcontractor')}</th>
                    <th>{t('materialOrder.fields.registrationDate')}</th>
                    <th>{t('materialOrder.fields.realizationDate')}</th>
                    <th>{t('materialOrder.fields.paymentMethod')}</th>
                    <th>{t('materialOrder.fields.status')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {materialOrders.map(materialOrder =>
                        <MaterialOrderListTableRow materialOrderData={materialOrder} key={materialOrder.id} />
                    )}
            </tbody>
        </table>
    )
}

export default MaterialOrderListTable