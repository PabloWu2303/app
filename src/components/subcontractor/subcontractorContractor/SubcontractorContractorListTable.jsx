import React from 'react';
import SubcontractorContractorListTableRow from './SubcontractorContractorListTableRow'
import { useTranslation } from 'react-i18next';

function SubcontractorContractorListTable(props) {
    const subcontractorContractors = props.subcontractorContractorList
    const { t } = useTranslation();
    console.log(subcontractorContractors)
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('subcontractorContractor.fields.name')}</th>
                    <th>{t('subcontractorContractor.fields.surname')}</th>
                    <th>{t('subcontractorContractor.fields.mobile')}</th>
                    <th>{t('subcontractorContractor.fields.email')}</th>
                    <th>{t('subcontractorContractor.fields.workplace')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {subcontractorContractors.map(subcontractorContractor =>
                        <SubcontractorContractorListTableRow subcontractorContractorData={subcontractorContractor} key={subcontractorContractor.id} />
                    )}
            </tbody>
        </table>
    )
}

export default SubcontractorContractorListTable