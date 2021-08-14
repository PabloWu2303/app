import React from 'react';
import SubcontractorListTableRow from './SubcontractorListTableRow'
import { useTranslation } from 'react-i18next';

function SubcontractorListTable(props) {
    const subcontractors = props.subcontractorList
    const { t } = useTranslation();
    console.log(subcontractors)
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('subcontractor.fields.name')}</th>
                    <th>{t('subcontractor.fields.nip')}</th>
                    <th>{t('subcontractor.fields.address')}</th>
                    <th>{t('subcontractor.fields.cooperationRate')}</th>
                    <th>{t('subcontractor.fields.deliveryMethod')}</th>
                    <th>{t('subcontractor.fields.contractor')}</th>
                    <th>{t('subcontractor.fields.supplier')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {subcontractors.map(subcontractor =>
                        <SubcontractorListTableRow subcontractorData={subcontractor} key={subcontractor.id} />
                    )}
            </tbody>
        </table>
    )
}

export default SubcontractorListTable