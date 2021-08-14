import React from 'react';
import { useTranslation } from 'react-i18next';

function MaterialListTableRow(props) {
     const onOrderMaterial = props.onOrderMaterial
     const material = onOrderMaterial.material[0]
     
    const { t } = useTranslation();
    return (
        <tr>
            <td>{material.name + " " + material.unitPrice + " PLN"}</td>
            <td>{onOrderMaterial.quantity}</td><td>
                <ul className="list-actions">
                    <li><button onClick={event => removeMaterial(event, 1)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeMaterial = (event, id) => {
    // const url = "http://localhost:8080/materials/" + id

    // fetch(url, {
    //     method: "DELETE",
    // }).then(
    //     data => console.log(data)
    // )
    // return (
    //     <Redirect to={{
    //         path: "/materials"
    //     }} />
    // )
}

export default MaterialListTableRow