const subcontractorsBaseUrl = 'http://localhost:8080/subcontractors'

export function getSubcontractorsApiCall() {
    const promise = fetch(subcontractorsBaseUrl)
    return promise;
}

export function getSubcontractorByIdApiCall(subcontractorId){
    const url = `${subcontractorsBaseUrl}/${subcontractorId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}

export function addSubcontractorApiCall(subcontractor) {
    const subcontractorString = JSON.stringify(subcontractor)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: subcontractorString
    }
    console.log(options)
    const promise = fetch(subcontractorsBaseUrl, options);
    return promise;
}

export function updateSubcontractorApiCall(subcontractorId, subcontractor) {
    const url = `${subcontractorsBaseUrl}/${subcontractorId}`
    const subcontractorString = JSON.stringify(subcontractor)
    console.log(subcontractorString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: subcontractorString
    }
    const promise = fetch(url, options);
    return promise;
}