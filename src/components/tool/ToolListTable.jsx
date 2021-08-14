import React from 'react';
import ToolListTableRow from './ToolListTableRow'
import { useTranslation } from 'react-i18next';

function ToolListTable(props) {
    const tools = props.toolsList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('tool.fields.name')}</th>
                    <th>{t('tool.fields.purpose')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tools.map(tool =>
                        <ToolListTableRow toolData={tool} key={tool.id} />
                    )}
            </tbody>
        </table>
    )
}

export default ToolListTable