import React from 'react';
import { useTranslation } from 'react-i18next';

function ServiceOrderDetailsData(props) {
    const serviceOrder = props.serviceOrderData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('serviceOrder.fields.name')}: {serviceOrder.name}</p>
            <p>{t('serviceOrder.fields.surname')}: {serviceOrder.surname}</p>
            <p>{t('serviceOrder.fields.mobile')}: {serviceOrder.mobile}</p>
            <p>{t('serviceOrder.fields.email')}: {serviceOrder.email}</p>
            <p>{t('serviceOrder.fields.workplace')}: {serviceOrder.workplace}</p>
        </React.Fragment>
    )
}

export default ServiceOrderDetailsData
