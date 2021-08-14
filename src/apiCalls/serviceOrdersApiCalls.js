const serviceOrdersBaseUrl = 'http://localhost:8080/serviceOrders'

export function getServiceOrdersApiCall() {
    const promise = fetch(serviceOrdersBaseUrl)
    return promise;
}

export function getServiceOrderByIdApiCall(serviceOrderId){
    const url = `${serviceOrdersBaseUrl}/${serviceOrderId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}

export function addServiceOrderApiCall(serviceOrder) {
    const serviceOrderString = JSON.stringify(serviceOrder)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: serviceOrderString
    }
    console.log(options)
    const promise = fetch(serviceOrdersBaseUrl, options);
    return promise;
}

export function updateServiceOrderApiCall(serviceOrderId, serviceOrder) {
    const url = `${serviceOrdersBaseUrl}/${serviceOrderId}`
    const serviceOrderString = JSON.stringify(serviceOrder)
    console.log(serviceOrderString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: serviceOrderString
    }
    const promise = fetch(url, options);
    return promise;
}