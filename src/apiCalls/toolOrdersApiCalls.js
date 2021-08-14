const toolOrdersBaseUrl = 'http://localhost:8080/toolOrders'

export function getToolOrdersApiCall() {
    const promise = fetch(toolOrdersBaseUrl)
    return promise;
}

export function getToolOrderByIdApiCall(toolOrderId){
    const url = `${toolOrdersBaseUrl}/${toolOrderId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}

export function addToolOrderApiCall(toolOrder) {
    const toolOrderString = JSON.stringify(toolOrder)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: toolOrderString
    }
    console.log(options)
    const promise = fetch(toolOrdersBaseUrl, options);
    return promise;
}

export function updateToolOrderApiCall(toolOrderId, toolOrder) {
    const url = `${toolOrdersBaseUrl}/${toolOrderId}`
    const toolOrderString = JSON.stringify(toolOrder)
    console.log(toolOrderString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: toolOrderString
    }
    const promise = fetch(url, options);
    return promise;
}