import React from 'react';
import { useTranslation } from 'react-i18next';

function ServiceDetailsData(props) {
    const service = props.serviceData
    console.log(service)
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('service.fields.name')}: {service.name}</p>
            <p>{t('service.fields.purpose')}: {service.purpose}</p>
        </React.Fragment>
    )
}

export default ServiceDetailsData
