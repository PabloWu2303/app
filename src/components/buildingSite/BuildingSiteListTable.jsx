import React from 'react';
import BuildingSiteListTableRow from './BuildingSiteListTableRow'
import { useTranslation } from 'react-i18next';

function BuildingSiteListTable(props) {
    const buildingSites = props.buildingSitesList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('buildingSite.fields.name')}</th>
                    <th>{t('buildingSite.fields.budget')}</th>
                    <th>{t('buildingSite.fields.startDate')}</th>
                    <th>{t('buildingSite.fields.endDate')}</th>
                    <th>{t('buildingSite.fields.address')}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {buildingSites.map(buildingSite =>
                        <BuildingSiteListTableRow buildingSiteData={buildingSite} key={buildingSite.id} />
                    )}
            </tbody>
        </table>
    )
}

export default BuildingSiteListTable