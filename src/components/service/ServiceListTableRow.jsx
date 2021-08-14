import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Redirect } from "react-router-dom"

function ServiceListTableRow(props) {
    const service = props.serviceData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{service.name}</td>
            <td>{service.purpose}</td><td>
                <ul className="list-actions">
                    <li><Link to={`/services/details/${service.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/services/edit/${service.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeService(event, service.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeService = (event, id) => {
    const url = "http://localhost:8080/services/" + id

    fetch(url, {
        method: "DELETE",
    }).then(
        data => console.log(data)
    )
    return (
        <Redirect to={{
            path: "/services"
        }} />
    )
}

export default ServiceListTableRow