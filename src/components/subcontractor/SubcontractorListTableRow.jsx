import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Redirect } from "react-router-dom"

function SubcontractorListTableRow(props) {
    const subcontractor = props.subcontractorData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{subcontractor.name}</td>
            <td>{subcontractor.nip}</td>
            <td>{subcontractor.address.city + ", ul. " + subcontractor.address.street + " " + subcontractor.address.houseNumber + (subcontractor.address.flatNumber ? ("/" + subcontractor.address.flatNumber + ", ") : ", ") + subcontractor.address.postalCode}</td>
            <td>{subcontractor.cooperationRate}</td>
            <td>{subcontractor.deliveryMethod}</td>
            <td>{subcontractor.contractor === true ? "true" : "false"}</td>
            <td>{subcontractor.supplier === true ? "true" : "false"}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/subcontractors/details/${subcontractor.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/subcontractors/edit/${subcontractor.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeSubcontractor(event, subcontractor.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeSubcontractor = (event, id) => {
    const url = "http://localhost:8080/subcontractors/" + id

    fetch(url, {
        method: "DELETE",
    }).then(
        data => console.log(data)
    )
    return (
        <Redirect to={{
            pathname: "/subcontractors"
        }} />
    )
}

export default SubcontractorListTableRow