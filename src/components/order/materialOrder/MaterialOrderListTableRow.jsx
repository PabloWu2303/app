import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MaterialOrderListTableRow(props) {
    const materialOrder = props.materialOrderData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{materialOrder.buildingSite.name + ", " + materialOrder.buildingSite.address.city + ", ul. " + materialOrder.buildingSite.address.street + " " + materialOrder.buildingSite.address.houseNumber}</td>
            <td>{materialOrder.subcontractor.name + ", " + materialOrder.subcontractor.address.city + ", ul. " + materialOrder.subcontractor.address.street + " " + materialOrder.subcontractor.address.houseNumber}</td>
            <td>{materialOrder.registerDate}</td>
            <td>{materialOrder.realizationDate}</td>
            <td>{materialOrder.paymentMethod}</td>
            <td>{materialOrder.status}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/materialOrders/details/${materialOrder.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/materialOrders/edit/${materialOrder.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeMaterialOrder(event, materialOrder.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeMaterialOrder = (event, id) => {
    const url = "http://localhost:8080/materialOrders/" + id

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

export default MaterialOrderListTableRow