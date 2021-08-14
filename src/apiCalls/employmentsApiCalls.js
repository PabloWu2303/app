const employmentsBaseUrl = 'http://localhost:8080/employments'

export function getEmploymentsApiCall() {
    const promise = fetch(employmentsBaseUrl + "?sort=city")
    return promise;
}

export function getEmploymentByIdApiCall(employmentId){
    const url = `${employmentsBaseUrl}/${employmentId}`;
    const promise = fetch(url);
    return promise;
}

export function addEmploymentApiCall(employment) {
    const employmentString = JSON.stringify(employment)
    console.log(employmentString)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: employmentString
    }
    const promise = fetch(employmentsBaseUrl, options);
    return promise;
}

export function updateEmploymentApiCall(employmentId, employment) {
    const url = `${employmentsBaseUrl}/${employmentId}`
    const employmentString = JSON.stringify(employment)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: employmentString
    }
    const promise = fetch(url, options);
    return promise;
}