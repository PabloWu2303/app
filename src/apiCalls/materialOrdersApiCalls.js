const materialOrdersBaseUrl = 'http://localhost:8080/materialOrders'

export function getMaterialOrdersApiCall() {
    const promise = fetch(materialOrdersBaseUrl)
    return promise;
}

export function getMaterialOrderByIdApiCall(materialOrderId){
    const url = `${materialOrdersBaseUrl}/${materialOrderId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}

export function addMaterialOrderApiCall(materialOrder) {
    const materialOrderString = JSON.stringify(materialOrder)
    console.log("json " + materialOrderString)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: materialOrderString
    }
    console.log(options)
    const promise = fetch(materialOrdersBaseUrl, options);
    return promise;
}

export function updateMaterialOrderApiCall(materialOrderId, materialOrder) {
    const url = `${materialOrdersBaseUrl}/${materialOrderId}`
    const materialOrderString = JSON.stringify(materialOrder)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: materialOrderString
    }
    const promise = fetch(url, options);
    return promise;
}