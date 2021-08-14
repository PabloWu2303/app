import React from 'react'
import { useTranslation } from 'react-i18next';

function MainContent() {
    const { t } = useTranslation();
    return (
        <main>
            <h2>{t('main-page.header')}</h2>
            <p>{t('main-page.content')}</p>
        </main>
    )
}

export default MainContent