import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Redirect } from "react-router-dom"

function MaterialListTableRow(props) {
    const material = props.materialData
    console.log(material)
    const { t } = useTranslation();
    return (
        <tr>
            <td>{material.name}</td>
            <td>{material.unitPrice}</td><td>
                <ul className="list-actions">
                    <li><Link to={`/materials/details/${material.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/materials/edit/${material.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeMaterial(event, material.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeMaterial = (event, id) => {
    const url = "http://localhost:8080/materials/" + id

    fetch(url, {
        method: "DELETE",
    }).then(
        data => console.log(data)
    )
    return (
        <Redirect to={{
            path: "/materials"
        }} />
    )
}

export default MaterialListTableRow