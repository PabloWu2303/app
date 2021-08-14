import React from 'react';
import { useTranslation } from 'react-i18next';

function SubcontractorContractorDetailsData(props) {
    const subcontractorContractor = props.subcontractorContractorData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('subcontractorContractor.fields.name')}: {subcontractorContractor.name}</p>
            <p>{t('subcontractorContractor.fields.surname')}: {subcontractorContractor.surname}</p>
            <p>{t('subcontractorContractor.fields.mobile')}: {subcontractorContractor.mobile}</p>
            <p>{t('subcontractorContractor.fields.email')}: {subcontractorContractor.email}</p>
            <p>{t('subcontractorContractor.fields.workplace')}: {subcontractorContractor.workplace}</p>
        </React.Fragment>
    )
}

export default SubcontractorContractorDetailsData
