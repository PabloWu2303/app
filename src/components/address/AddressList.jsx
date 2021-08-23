import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getAddressesApiCall } from '../../apiCalls/addressesApiCalls'
import AddressListTable from './AddressListTable'

class AddressList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            addresses: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchAddressesList()
    }

    fetchAddressesList = () => {
        getAddressesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        addresses: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { t } = this.props;
        const { error, isLoaded, addresses } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <AddressListTable addressList={addresses} />
        }

        return (
            <main>
                <h2>{t('address.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/addresses/add" className="list-actions-button-add">{t('address.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(AddressList)