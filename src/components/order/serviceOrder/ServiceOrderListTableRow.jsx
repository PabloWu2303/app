import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ServiceOrderListTableRow(props) {
    const serviceOrder = props.serviceOrderData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{serviceOrder.name}</td>
            <td>{serviceOrder.surname}</td>
            <td>{serviceOrder.mobile}</td>
            <td>{serviceOrder.email}</td>
            <td>{serviceOrder.workplace}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/serviceOrders/details/${serviceOrder.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/serviceOrders/edit/${serviceOrder.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeServiceOrder(event, serviceOrder.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeServiceOrder = (event, id) => {
    const url = "http://localhost:8080/serviceOrders/" + id

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

export default ServiceOrderListTableRow