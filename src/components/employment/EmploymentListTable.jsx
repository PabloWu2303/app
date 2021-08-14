import React from 'react';
import EmploymentListTableRow from './EmploymentListTableRow'
import { useTranslation } from 'react-i18next';

function EmploymentListTable(props) {
    const employments = props.employmentList
    const { t } = useTranslation();
    console.log(employments)
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('employment.fields.name')}</th>
                    <th>{t('employment.fields.surname')}</th>
                    <th>{t('employment.fields.mobile')}</th>
                    <th>{t('employment.fields.email')}</th>
                    <th>{t('employment.fields.workplace')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {employments.map(employment =>
                        <EmploymentListTableRow employmentData={employment} key={employment.id} />
                    )}
            </tbody>
        </table>
    )
}

export default EmploymentListTable