import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SubcontractorContractorListTableRow(props) {
    const subcontractorContractor = props.subcontractorContractorData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{subcontractorContractor.name}</td>
            <td>{subcontractorContractor.surname}</td>
            <td>{subcontractorContractor.mobile}</td>
            <td>{subcontractorContractor.email}</td>
            <td>{subcontractorContractor.workplace}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/subcontractorContractors/details/${subcontractorContractor.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/subcontractorContractors/edit/${subcontractorContractor.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeSubcontractorContractor(event, subcontractorContractor.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeSubcontractorContractor = (event, id) => {
    const url = "http://localhost:8080/subcontractorContractors/" + id

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

export default SubcontractorContractorListTableRow