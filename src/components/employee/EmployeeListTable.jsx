import React from 'react';
import EmployeeListTableRow from './EmployeeListTableRow'
import { useTranslation } from 'react-i18next';

function EmployeeListTable(props) {
    const employees = props.employeeList
    const { t } = useTranslation();
    console.log(employees)
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('employee.fields.name')}</th>
                    <th>{t('employee.fields.surname')}</th>
                    <th>{t('employee.fields.mobile')}</th>
                    <th>{t('employee.fields.email')}</th>
                    <th>{t('employee.fields.workplace')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee =>
                        <EmployeeListTableRow employeeData={employee} key={employee.id} />
                    )}
            </tbody>
        </table>
    )
}

export default EmployeeListTable