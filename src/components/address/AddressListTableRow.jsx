import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AddressListTableRow(props) {
    const address = props.addressData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{address.city}</td>
            <td>{address.street}</td>
            <td>{address.houseNumber}</td>
            <td>{address.flatNumber !== 0 ? address.flatNumber : ""}</td>
            <td>{address.postalCode}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/addresses/details/${address.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/addresses/edit/${address.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeAddress(event, address.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeAddress = (event, id) => {
    const url = "http://localhost:8080/addresses/" + id

    fetch(url, {
        method: "DELETE",
    }).then(
        data => console.log(data)
    )
    refreshPage()
}

function refreshPage() {
    window.location.reload();
}

export default AddressListTableRow