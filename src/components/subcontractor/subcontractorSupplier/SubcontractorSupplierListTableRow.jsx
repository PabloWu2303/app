import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SubcontractorSupplierListTableRow(props) {
    const subcontractorSupplier = props.subcontractorSupplierData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{subcontractorSupplier.name}</td>
            <td>{subcontractorSupplier.nip}</td>
            <td>{subcontractorSupplier.address}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/subcontractorSuppliers/details/${subcontractorSupplier.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/subcontractorSuppliers/edit/${subcontractorSupplier.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeSubcontractorSupplier(event, subcontractorSupplier.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeSubcontractorSupplier = (event, id) => {
    const url = "http://localhost:8080/subcontractorSuppliers/" + id

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

export default SubcontractorSupplierListTableRow