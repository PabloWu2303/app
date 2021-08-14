const addressesBaseUrl = 'http://localhost:8080/addresses'

export function getAddressesApiCall() {
    const promise = fetch(addressesBaseUrl + "?sort=city")
    return promise;
}

export function getAddressByIdApiCall(addressId){
    const url = `${addressesBaseUrl}/${addressId}`;
    const promise = fetch(url);
    return promise;
}

export function addAddressApiCall(address) {
    const addressString = JSON.stringify(address)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: addressString
    }
    const promise = fetch(addressesBaseUrl, options);
    return promise;
}

export function updateAddressApiCall(addressId, address) {
    const url = `${addressesBaseUrl}/${addressId}`
    const addressString = JSON.stringify(address)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: addressString
    }
    const promise = fetch(url, options);
    return promise;
}