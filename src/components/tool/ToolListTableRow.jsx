import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Redirect } from "react-router-dom"

function ToolListTableRow(props) {
    const tool = props.toolData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{tool.name}</td>
            <td>{tool.purpose}</td><td>
                <ul className="list-actions">
                    <li><Link to={`/tools/details/${tool.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/tools/edit/${tool.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeTool(event, tool.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeTool = (event, id) => {
    const url = "http://localhost:8080/tools/" + id

    fetch(url, {
        method: "DELETE",
    }).then(
        data => console.log(data)
    )
    return (
        <Redirect to={{
            path: "/tools"
        }} />
    )
}

export default ToolListTableRow