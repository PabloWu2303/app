import React from "react"
import { useTranslation } from 'react-i18next';

function Header() {
    const { t } = useTranslation();
    return (
        <>
            <header>
                <h1>{t('header.title')}</h1>
                <img src="/img/logo.png" alt="Order Management System" />
            </header>
        </>
    )
}

export default Header