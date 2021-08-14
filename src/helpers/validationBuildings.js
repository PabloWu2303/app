function validateForm() {
    const nameInput = document.getElementById("name");
    const addressInput = document.getElementById("address");
    const budgetInput = document.getElementById("budget");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById(
      "endDate"
    );
   
    const errorName = document.getElementById("errorName");
    const errorAddress = document.getElementById("errorAddress");
    const errorBudget = document.getElementById("errorBudget");
    const errorStartDate = document.getElementById("errorStartDate");
    const errorEndDate = document.getElementById(
      "errorEndDate"
    );
    const errorsSummary = document.getElementById("errorsSummary");
  
    let valid = true;
  
    resetErrors(
      [nameInput, addressInput, budgetInput, startDateInput, endDateInput],
      [errorName, errorAddress, errorBudget, errorStartDate, errorEndDate],
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
  
    if (!checkRequired(budgetInput.value)) {
      valid = false;
      budgetInput.classList.add("error-input");
      errorBudget.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(budgetInput.value, 2, 60)) {
      valid = false;
      budgetInput.classList.add("error-input");
      errorBudget.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
  
    if (!checkRequired(startDateInput.value)) {
      valid = false;
      startDateInput.classList.add("error-input");
      errorStartDate.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(startDateInput.value, 2, 60)) {
      valid = false;
      startDateInput.classList.add("error-input");
      errorStartDate.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
  
    if (!checkRequired(endDateInput.value)) {
      valid = false;
      endDateInput.classList.add("error-input");
      errorEndDate.innerText = "Pole jest wymagane";
    }
  
    if (!valid) {
      errorsSummary.innerText = "Formularz zawiera błędy";
    }
  
    return valid;
  }
  