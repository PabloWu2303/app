import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function EmploymentListTableRow(props) {
    const employment = props.employmentData
    console.log(employment)
    const { t } = useTranslation();
    return (
        <tr>
            <td>{employment.buildingSite.name}</td>
            <td>{employment.employee.name + " " + employment.employee.surname}</td>
            <td>{employment.startDate}</td>
            <td>{employment.endDate}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/employments/details/${employment.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/employments/edit/${employment.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeEmployment(event, employment.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeEmployment = (event, id) => {
    const url = "http://localhost:8080/employments/" + id

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

export default EmploymentListTableRow