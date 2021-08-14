import React from 'react';
import MaterialListTableRow from './MaterialListTableRow'
import { useTranslation } from 'react-i18next';

function MaterialListTable(props) {
    const materials = props.materialsList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('material.fields.name')}</th>
                    <th>{t('material.fields.unitPrice')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {materials.map(material =>
                        <MaterialListTableRow materialData={material} key={material.id} />
                    )}
            </tbody>
        </table>
    )
}

export default MaterialListTable