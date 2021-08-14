import React from 'react';
import ToolOrderListTableRow from './ToolOrderListTableRow'
import { useTranslation } from 'react-i18next';

function ToolOrderListTable(props) {
    const toolOrders = props.toolOrderList
    const { t } = useTranslation();
    console.log(toolOrders)
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('toolOrder.fields.name')}</th>
                    <th>{t('toolOrder.fields.surname')}</th>
                    <th>{t('toolOrder.fields.mobile')}</th>
                    <th>{t('toolOrder.fields.email')}</th>
                    <th>{t('toolOrder.fields.workplace')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {toolOrders.map(toolOrder =>
                        <ToolOrderListTableRow toolOrderData={toolOrder} key={toolOrder.id} />
                    )}
            </tbody>
        </table>
    )
}

export default ToolOrderListTable