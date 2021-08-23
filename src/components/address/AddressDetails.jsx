import React from 'react'
import { Link } from 'react-router-dom'
import { getAddressByIdApiCall } from '../../apiCalls/addressesApiCalls'
import AddressDetailsData from './AddressDetailsData'
import { withTranslation } from 'react-i18next';

class AddressDetails extends React.Component { 
    constructor(props) {
        super(props)
    let { addressId } = props.match.params
    this.state = {
        addressId: addressId,
        address: null,
        error: null,
        isLoaded: false,
        message: null
    }
    addressId = parseInt(addressId)
    }

    fetchAddressDetails = () => {
        getAddressByIdApiCall(this.state.addressId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            address: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            address: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    componentDidMount() {
        this.fetchAddressDetails()
    }

    render() {
        const { address, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;
    
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <AddressDetailsData addressData={address} />
        }
        return (
            <main>
                <h2>{t('address.details.title')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/addresses" className="list-actions-button-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }
}

export default withTranslation()(AddressDetails)