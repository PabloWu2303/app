const materialsBaseUrl = 'http://localhost:8080/materials'

export function getMaterialsApiCall() {
    const promise = fetch(materialsBaseUrl)
    return promise;
}

export function getMaterialByIdApiCall(materialId){
    const url = `${materialsBaseUrl}/${materialId}`;
    const promise = fetch(url);
    console.log(promise)
    return promise;
}

export function addMaterialApiCall(material) {
    const materialString = JSON.stringify(material)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: materialString
    }
    console.log(options)
    const promise = fetch(materialsBaseUrl, options);
    return promise;
}

export function updateMaterialApiCall(materialId, material) {
    const url = `${materialsBaseUrl}/${materialId}`
    const materialString = JSON.stringify(material)
    console.log(materialString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: materialString
    }
    const promise = fetch(url, options);
    return promise;
}