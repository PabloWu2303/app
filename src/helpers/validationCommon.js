export function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error_input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

export function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

export function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

export function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return re.test(value);
}

export function checkIfDoubleFormat(value){
    if(!value){
        return false;
    }
   // value = value.toString.trim();
    const re = /[0-9]+\.[0-9]{2}/i;
    return re.test(value);
}

export function checkIfOnlyNumbers(value){
    if(!value){
        return false;
    }
   // value = value.toString.trim();
    const re = /[0-9]+/i;
    return re.test(value);
}

export function checkHouseNumber(value){
    if(!value){
        return false;
    }
   // value = value.toString.trim();
    const re = /^[0-9]+/;
    return re.test(value);
}