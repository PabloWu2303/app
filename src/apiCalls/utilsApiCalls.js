const utilsBaseUrl = 'http://localhost:8080/enums'

export function getStatusesApiCall() {
    const promise = fetch(utilsBaseUrl+"/status")
    return promise;
}

export function getPaymentMethodsApiCall() {
    const promise = fetch(utilsBaseUrl+"/paymentMethods")
    return promise;
}