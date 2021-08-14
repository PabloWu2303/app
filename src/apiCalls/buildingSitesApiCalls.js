const buildingSitesBaseUrl = 'http://localhost:8080/buildingSites'

export function getBuildingSitesApiCall() {
    const promise = fetch(buildingSitesBaseUrl)
    return promise;
}

export function getBuildingSiteByIdApiCall(buildingSiteId){
    const url = `${buildingSitesBaseUrl}/${buildingSiteId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}

export function addBuildingSiteApiCall(buildingSite) {
    const buildingSiteString = JSON.stringify(buildingSite)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: buildingSiteString
    }
    console.log(options)
    const promise = fetch(buildingSitesBaseUrl, options);
    return promise;
}

export function updateBuildingSiteApiCall(buildingSiteId, buildingSite) {
    const url = `${buildingSitesBaseUrl}/${buildingSiteId}`
    const buildingSiteString = JSON.stringify(buildingSite)
    console.log(buildingSiteString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: buildingSiteString
    }
    const promise = fetch(url, options);
    return promise;
}

export function getBuildingSitesEmploymentApiCall(buildingSiteId){
    const url = `${buildingSitesBaseUrl}/employments/${buildingSiteId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}