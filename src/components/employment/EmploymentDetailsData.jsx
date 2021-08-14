import React from 'react';
import { useTranslation } from 'react-i18next';

function EmploymentDetailsData(props) {
    const employment = props.employmentData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('employment.fields.name')}: {employment.name}</p>
            <p>{t('employment.fields.surname')}: {employment.surname}</p>
            <p>{t('employment.fields.mobile')}: {employment.mobile}</p>
            <p>{t('employment.fields.email')}: {employment.email}</p>
            <p>{t('employment.fields.workplace')}: {employment.workplace}</p>
        </React.Fragment>
    )
}

export default EmploymentDetailsData
