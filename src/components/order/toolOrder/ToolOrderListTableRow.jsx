import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ToolOrderListTableRow(props) {
    const toolOrder = props.toolOrderData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{toolOrder.name}</td>
            <td>{toolOrder.surname}</td>
            <td>{toolOrder.mobile}</td>
            <td>{toolOrder.email}</td>
            <td>{toolOrder.workplace}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/toolOrders/details/${toolOrder.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/toolOrders/edit/${toolOrder.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeToolOrder(event, toolOrder.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeToolOrder = (event, id) => {
    const url = "http://localhost:8080/toolOrders/" + id

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

export default ToolOrderListTableRow