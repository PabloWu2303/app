import React from 'react';
import { useTranslation } from 'react-i18next';

function BuildingSiteDetailsData(props) {
    const buildingSite = props.buildingSiteData
    console.log(buildingSite)
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('buildingSite.fields.name')}: {buildingSite.name}</p>
            <p>{t('buildingSite.fields.budget')}: {buildingSite.budget}</p>
            <p>{t('buildingSite.fields.startDate')}: {buildingSite.startDate}</p>
            <p>{t('buildingSite.fields.endDate')}: {buildingSite.endDate}</p>
            <p>{t('buildingSite.fields.address')}: {buildingSite.address.city + ", ul. " + buildingSite.address.street + " " + buildingSite.address.houseNumber + (buildingSite.address.flatNumber ? ("/" + buildingSite.address.flatNumber + ", ") : ", ") + buildingSite.address.postalCode}</p>
        </React.Fragment>
    )
}

export default BuildingSiteDetailsData
