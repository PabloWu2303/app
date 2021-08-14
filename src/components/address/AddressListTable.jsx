import React from 'react';
import AddressListTableRow from './AddressListTableRow'
import { useTranslation } from 'react-i18next';

function AddressListTable(props) {
    const addresses = props.addressList
    const { t } = useTranslation();
    console.log(addresses)
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('address.fields.city')}</th>
                    <th>{t('address.fields.street')}</th>
                    <th>{t('address.fields.houseNumber')}</th>
                    <th>{t('address.fields.flatNumber')}</th>
                    <th>{t('address.fields.postalCode')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {addresses.map(address =>
                        <AddressListTableRow addressData={address} key={address.id} />
                    )}
            </tbody>
        </table>
    )
}

export default AddressListTable