import React from 'react';
import { useTranslation } from 'react-i18next';

function SubcontractorSupplierDetailsData(props) {
    const subcontractor = props.subcontractorSupplierData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('subcontractor.fields.name')}: {subcontractor.name}</p>
            <p>{t('subcontractor.fields.nip')}: {subcontractor.nip}</p>
            <p>{t('subcontractor.fields.address')}: {subcontractor.address}</p>
            <p>{t('subcontractor.fields.cooperationRate')}: {subcontractor.cooperationRate}</p>
            <p>{t('subcontractor.fields.deliveryMethod')}: {subcontractor.deliveryMethod}</p>
            <p>{t('subcontractor.fields.supplier')}: {subcontractor.supplier}</p>
            <p>{t('subcontractor.fields.contractor')}: {subcontractor.contractor}</p>
        </React.Fragment>
    )
}

export default SubcontractorSupplierDetailsData