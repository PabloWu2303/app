import React from 'react';
import SubcontractorSupplierListTableRow from './SubcontractorSupplierListTableRow'
import { useTranslation } from 'react-i18next';

function SubcontractorSupplierListTable(props) {
    const subcontractorSuppliers = props.subcontractorSupplierList
    const { t } = useTranslation();
    console.log(subcontractorSuppliers)
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('subcontractorSupplier.fields.name')}</th>
                    <th>{t('subcontractorSupplier.fields.nip')}</th>
                    <th>{t('subcontractorSupplier.fields.address')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {subcontractorSuppliers.map(subcontractorSupplier =>
                        <SubcontractorSupplierListTableRow subcontractorSupplierData={subcontractorSupplier} key={subcontractorSupplier.id} />
                    )}
            </tbody>
        </table>
    )
}

export default SubcontractorSupplierListTable