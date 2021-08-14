import React from 'react';
import ServiceOrderListTableRow from './ServiceOrderListTableRow'
import { useTranslation } from 'react-i18next';

function ServiceOrderListTable(props) {
    const serviceOrders = props.serviceOrderList
    const { t } = useTranslation();
    console.log(serviceOrders)
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('serviceOrder.fields.name')}</th>
                    <th>{t('serviceOrder.fields.surname')}</th>
                    <th>{t('serviceOrder.fields.mobile')}</th>
                    <th>{t('serviceOrder.fields.email')}</th>
                    <th>{t('serviceOrder.fields.workplace')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {serviceOrders.map(serviceOrder =>
                        <ServiceOrderListTableRow serviceOrderData={serviceOrder} key={serviceOrder.id} />
                    )}
            </tbody>
        </table>
    )
}

export default ServiceOrderListTable