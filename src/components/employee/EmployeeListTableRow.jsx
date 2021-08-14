import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function EmployeeListTableRow(props) {
    const employee = props.employeeData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.surname}</td>
            <td>{employee.mobile}</td>
            <td>{employee.email}</td>
            <td>{employee.workplace}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/employees/details/${employee.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/employees/edit/${employee.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeEmployee(event, employee.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeEmployee = (event, id) => {
    const url = "http://localhost:8080/employees/" + id

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

export default EmployeeListTableRow