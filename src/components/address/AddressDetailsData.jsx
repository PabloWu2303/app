import React from 'react';
import { useTranslation } from 'react-i18next';

function AddressDetailsData(props) {
    const address = props.addressData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('address.fields.city')}: {address.city}</p>
            <p>{t('address.fields.street')}: {address.street}</p>
            <p>{t('address.fields.houseNumber')}: {address.houseNumber}</p>
            <p>{t('address.fields.flatNumber')}: {address.flatNumber}</p>
            <p>{t('address.fields.postalCode')}: {address.postalCode}</p>
        </React.Fragment>
    )
}

export default AddressDetailsData
