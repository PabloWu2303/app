import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BuildingSiteListTableRow(props) {
    const buildingSite = props.buildingSiteData
    const { t } = useTranslation();
    console.log(buildingSite)
    return (
        <tr>
            <td>{buildingSite.name}</td>
            <td>{buildingSite.budget}</td>
            <td>{buildingSite.startDate}</td>
            <td>{buildingSite.endDate}</td>
            <td>{buildingSite.address.city + ", ul. " + buildingSite.address.street + " " + buildingSite.address.houseNumber + (buildingSite.address.flatNumber ? ("/" + buildingSite.address.flatNumber + ", ") : ", ") + buildingSite.address.postalCode}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/buildingSites/details/${buildingSite.id}`} className="list-actions-button">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/buildingSites/edit/${buildingSite.id}`} className="list-actions-button">{t('list.actions.edit')}</Link></li>
                    <li><button onClick={event => removeBuildingSite(event, buildingSite.id)} className="list-actions-button">{t('list.actions.delete')}</button></li>
                </ul>
            </td>
        </tr>
    )
}

const removeBuildingSite = (event, id) => {
    const url = "http://localhost:8080/buildingSites/" + id

    fetch(url, {
        method: "DELETE",
    }).then(
        data => console.log(data)
    )
    refreshPage()
}

function refreshPage() {
    window.location.reload();
}

export default BuildingSiteListTableRow