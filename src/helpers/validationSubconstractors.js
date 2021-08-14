function validateForm() {
    const nameInput = document.getElementById("name");
    const addressInput = document.getElementById("address");
    const nipInput = document.getElementById("nip");
   
    const errorName = document.getElementById("errorName");
    const errorAddress = document.getElementById("errorAddress");
    const errorNip = document.getElementById("errorNip");
    const errorsSummary = document.getElementById("errorsSummary");
  
    let valid = true;
  
    resetErrors(
      [nameInput, addressInput, nipInput],
      [errorName, errorAddress, errorNip],
      errorsSummary
    );
  
    if (!checkRequired(nameInput.value)) {
      valid = false;
      nameInput.classList.add("error-input");
      errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(NameInput.value, 2, 60)) {
      valid = false;
      nameInput.classList.add("error-input");
      errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
  
    if (!checkRequired(addressInput.value)) {
      valid = false;
      addressInput.classList.add("error-input");
      errorAddress.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(addressInput.value, 2, 60)) {
      valid = false;
      addressInput.classList.add("error-input");
      errorAddress.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
  
    if (!checkRequired(nipInput.value)) {
      valid = false;
      nipInput.classList.add("error-input");
      errorNip.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nipInput.value, 2, 60)) {
      valid = false;
      nipInput.classList.add("error-input");
      errorNip.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
  
  
    if (!valid) {
      errorsSummary.innerText = "Formularz zawiera błędy";
    }
  
    return valid;
  }
  