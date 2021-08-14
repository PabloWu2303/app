import React from 'react';
import { useTranslation } from 'react-i18next';

function ToolOrderDetailsData(props) {
    const toolOrder = props.toolOrderData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('toolOrder.fields.name')}: {toolOrder.name}</p>
            <p>{t('toolOrder.fields.surname')}: {toolOrder.surname}</p>
            <p>{t('toolOrder.fields.mobile')}: {toolOrder.mobile}</p>
            <p>{t('toolOrder.fields.email')}: {toolOrder.email}</p>
            <p>{t('toolOrder.fields.workplace')}: {toolOrder.workplace}</p>
        </React.Fragment>
    )
}

export default ToolOrderDetailsData
