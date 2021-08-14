import React from 'react';
import { useTranslation } from 'react-i18next';

function ToolDetailsData(props) {
    const tool = props.toolData
    console.log(tool)
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('tool.fields.name')}: {tool.name}</p>
            <p>{t('tool.fields.purpose')}: {tool.purpose}</p>
        </React.Fragment>
    )
}

export default ToolDetailsData
