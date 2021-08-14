import React from 'react';
import { useTranslation } from 'react-i18next';

function SubcontractorDetailsData(props) {
    const subcontractor = props.subcontractorData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('subcontractor.fields.name')}: {subcontractor.name}</p>
            <p>{t('subcontractor.fields.nip')}: {subcontractor.nip}</p>
            <p>{t('subcontractor.fields.address')}: {subcontractor.address.city + ", ul. " + subcontractor.address.street + " " + subcontractor.address.houseNumber + (subcontractor.address.flatNumber ? ("/" + subcontractor.address.flatNumber + ", ") : ", ") + subcontractor.address.postalCode}</p>
            <p>{t('subcontractor.fields.cooperationRate')}: {subcontractor.cooperationRate}</p>
            <p>{t('subcontractor.fields.deliveryMethod')}: {subcontractor.deliveryMethod}</p>
            <p>{t('subcontractor.fields.supplier')}: {subcontractor.supplier? "true" : "false"}</p>
            <p>{t('subcontractor.fields.contractor')}: {subcontractor.contractor? "true" : "false"}</p>
        </React.Fragment>
    )
}

export default SubcontractorDetailsData