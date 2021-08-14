import React from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Navigation() {
    const { t } = useTranslation();
    return (
        <nav>
            <ul>
                <li><Link to="/" className="<%= navLocation == 'main' ? 'active' : ''%>">{t('nav.main-page')}</Link></li>
                <li><Link to="/subcontractors" className="<%= navLocation == 'addresses' ? 'active' : ''%>">{t('nav.subcontractors')}</Link></li>
                <li><Link to="/addresses" className="<%= navLocation == 'addresses' ? 'active' : ''%>">{t('nav.addresses')}</Link></li>
                <li><Link to="/buildingSites" className="<%= navLocation == 'buildingSites' ? 'active' : ''%>">{t('nav.buildings')}</Link></li>
                <li><Link to="/orders" className="<%= navLocation == 'orders' ? 'active' : ''%>">{t('nav.orders')}</Link></li>
                <li><Link to="/employees" className="<%= navLocation == 'orders' ? 'active' : ''%>">{t('nav.employees')}</Link></li>
                <li><Link to="/materials" className="<%= navLocation == 'orders' ? 'active' : ''%>">{t('nav.materials')}</Link></li>
                <li><Link to="/tools" className="<%= navLocation == 'orders' ? 'active' : ''%>">{t('nav.tools')}</Link></li>
                <li><Link to="/services" className="<%= navLocation == 'orders' ? 'active' : ''%>">{t('nav.services')}</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation