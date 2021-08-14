import React from 'react';
import OnOrderMaterialListTableRow from './OnOrderMaterialListTableRow'
import { useTranslation } from 'react-i18next';

function OnOrderMaterialListTable(props) {
    const onOrderMaterials = props.onOrderMaterialsList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('onOrderMaterial.fields.name')}</th>
                    <th>{t('onOrderMaterial.fields.unitPrice')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {onOrderMaterials.map(onOrderMaterial =>
                    <OnOrderMaterialListTableRow onOrderMaterial={onOrderMaterial} key={onOrderMaterial.id}/>
                )}
            </tbody>
        </table>
    )
}

export default OnOrderMaterialListTable