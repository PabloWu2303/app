import React from 'react';
import ServiceListTableRow from './ServiceListTableRow'
import { useTranslation } from 'react-i18next';

function ServiceListTable(props) {
    const services = props.servicesList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('service.fields.name')}</th>
                    <th>{t('service.fields.purpose')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {services.map(service =>
                        <ServiceListTableRow serviceData={service} key={service.id} />
                    )}
            </tbody>
        </table>
    )
}

export default ServiceListTable