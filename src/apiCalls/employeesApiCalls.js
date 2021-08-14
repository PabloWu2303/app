const employeesBaseUrl = 'http://localhost:8080/employees'

export function getEmployeesApiCall() {
    const promise = fetch(employeesBaseUrl + "?sort=city")
    return promise;
}

export function getEmployeeByIdApiCall(employeeId){
    const url = `${employeesBaseUrl}/${employeeId}`;
    const promise = fetch(url);
    return promise;
}

export function addEmployeeApiCall(employee) {
    const employeeString = JSON.stringify(employee)
    console.log(employee)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: employeeString
    }
    const promise = fetch(employeesBaseUrl, options);
    return promise;
}

export function updateEmployeeApiCall(employeeId, employee) {
    const url = `${employeesBaseUrl}/${employeeId}`
    const employeeString = JSON.stringify(employee)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: employeeString
    }
    const promise = fetch(url, options);
    return promise;
}