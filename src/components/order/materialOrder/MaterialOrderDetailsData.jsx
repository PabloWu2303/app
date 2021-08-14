import React from 'react';
import { useTranslation } from 'react-i18next';

function MaterialOrderDetailsData(props) {
    const materialOrder = props.materialOrderData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('materialOrder.fields.buildingSite')}: {materialOrder.buildingSite.name + ", " + materialOrder.buildingSite.address.city + ", ul. " + materialOrder.buildingSite.address.street + " " + materialOrder.buildingSite.address.houseNumber}</p>
            <p>{t('materialOrder.fields.subcontractor')}: {materialOrder.subcontractor.name + ", " + materialOrder.subcontractor.address.city + ", ul. " + materialOrder.subcontractor.address.street + " " + materialOrder.subcontractor.address.houseNumber}</p>
            <p>{t('materialOrder.fields.registrationDate')}: {materialOrder.registerDate}</p>
            <p>{t('materialOrder.fields.realizationDate')}: {materialOrder.realizationDate}</p>
            <p>{t('materialOrder.fields.paymentMethod')}: {materialOrder.paymentMethod}</p>
            <p>{t('materialOrder.fields.status')}: {materialOrder.status}</p>
            <p>{t('materialOrder.fields.address')}: {materialOrder.address.city}</p>
            <p>{t('materialOrder.fields.address')}:</p>
            {materialOrder.onOrderMaterials.map(onOrderMaterial =>
                <p> {onOrderMaterial.material.name},  {onOrderMaterial.material.unitPrice} PLN,  {onOrderMaterial.quantity} szt.</p>)}
        </React.Fragment>
    )
}

export default MaterialOrderDetailsData
