import React from 'react';
import { useTranslation } from 'react-i18next';

function EmployeeDetailsData(props) {
    const employee = props.employeeData
    const { t } = useTranslation();
    return (
        <form className="form">
            <p>{t('employee.fields.name')}:</p><p> {employee.name}</p><p/>
            <p>{t('employee.fields.surname')}:</p><p> {employee.surname}</p><p/>
            <p>{t('employee.fields.mobile')}:</p><p> {employee.mobile}</p><p/>
            <p>{t('employee.fields.email')}:</p><p> {employee.email}</p><p/>
            <p>{t('employee.fields.workplace')}:</p><p> {employee.workplace}</p><p/>
        </form>
    )
}

export default EmployeeDetailsData
