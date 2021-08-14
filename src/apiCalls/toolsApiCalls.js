const toolsBaseUrl = 'http://localhost:8080/tools'

export function getToolsApiCall() {
    const promise = fetch(toolsBaseUrl)
    return promise;
}

export function getToolByIdApiCall(toolId){
    const url = `${toolsBaseUrl}/${toolId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}

export function addToolApiCall(tool) {
    const toolString = JSON.stringify(tool)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: toolString
    }
    console.log(options)
    const promise = fetch(toolsBaseUrl, options);
    return promise;
}

export function updateToolApiCall(toolId, tool) {
    const url = `${toolsBaseUrl}/${toolId}`
    const toolString = JSON.stringify(tool)
    console.log(toolString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: toolString
    }
    const promise = fetch(url, options);
    return promise;
}