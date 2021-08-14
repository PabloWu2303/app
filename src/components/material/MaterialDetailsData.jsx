import React from 'react';
import { useTranslation } from 'react-i18next';

function MaterialDetailsData(props) {
    const material = props.materialData
    console.log(material)
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('material.fields.name')}: {material.name}</p>
            <p>{t('material.fields.unitPrice')}: {material.unitPrice}</p>
        </React.Fragment>
    )
}

export default MaterialDetailsData
