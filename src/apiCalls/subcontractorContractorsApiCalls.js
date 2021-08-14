const subcontractorContractorsBaseUrl = 'http://localhost:8080/subcontractorContractors'

export function getSubcontractorContractorsApiCall() {
    const promise = fetch(subcontractorContractorsBaseUrl)
    return promise;
}

export function getSubcontractorContractorByIdApiCall(subcontractorContractorId){
    const url = `${subcontractorContractorsBaseUrl}/${subcontractorContractorId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}

export function addSubcontractorContractorApiCall(subcontractorContractor) {
    const subcontractorContractorString = JSON.stringify(subcontractorContractor)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: subcontractorContractorString
    }
    console.log(options)
    const promise = fetch(subcontractorContractorsBaseUrl, options);
    return promise;
}

export function updateSubcontractorContractorApiCall(subcontractorContractorId, subcontractorContractor) {
    const url = `${subcontractorContractorsBaseUrl}/${subcontractorContractorId}`
    const subcontractorContractorString = JSON.stringify(subcontractorContractor)
    console.log(subcontractorContractorString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: subcontractorContractorString
    }
    const promise = fetch(url, options);
    return promise;
}