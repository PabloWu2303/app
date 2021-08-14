const servicesBaseUrl = 'http://localhost:8080/services'

export function getServicesApiCall() {
    const promise = fetch(servicesBaseUrl)
    return promise;
}

export function getServiceByIdApiCall(serviceId){
    const url = `${servicesBaseUrl}/${serviceId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}

export function addServiceApiCall(service) {
    const serviceString = JSON.stringify(service)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: serviceString
    }
    console.log(options)
    const promise = fetch(servicesBaseUrl, options);
    return promise;
}

export function updateServiceApiCall(serviceId, service) {
    const url = `${servicesBaseUrl}/${serviceId}`
    const serviceString = JSON.stringify(service)
    console.log(serviceString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: serviceString
    }
    const promise = fetch(url, options);
    return promise;
}