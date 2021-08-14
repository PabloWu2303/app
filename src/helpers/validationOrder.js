function validateForm() {
  const idOrderInput = document.getElementById("idOrder");
  const statusInput = document.getElementById("status");
  const subconstractorInput = document.getElementById("subconstractor");
  const buildingInput = document.getElementById("building");
  const assumedRealizationDateInput = document.getElementById(
    "assumedRealizationDate"
  );

  const errorIdOrder = document.getElementById("errorIdOrder");
  const errorStatus = document.getElementById("errorStatus");
  const errorSubconstractor = document.getElementById("errorSubconstractor");
  const errorBuilding = document.getElementById("errorBuilding");
  const errorAssumedRealizationDate = document.getElementById(
    "errorAssumedRealizationDate"
  );
  const errorsSummary = document.getElementById("errorsSummary");

  let valid = true;

  resetErrors(
    [idOrderInput, statusInput, subconstractorInput, buildingInput, assumedRealizationDateInput],
    [errorIdOrder, errorStatus, errorSubconstractor, errorBuilding, errorAssumedRealizationDate],
    errorsSummary
  );

  if (!checkRequired(idOrderInput.value)) {
    valid = false;
    idOrderInput.classList.add("error-input");
    errorIdOrder.innerText = "Pole jest wymagane - front";
  } else if (!checkTextLengthRange(idOrderInput.value, 2, 60)) {
    valid = false;
    idOrderInput.classList.add("error-input");
    errorIdOrder.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }

  if (!checkRequired(statusInput.value)) {
    valid = false;
    statusInput.classList.add("error-input");
    errorStatus.innerText = "Pole jest wymagane - front";
  } else if (!checkTextLengthRange(statusInput.value, 2, 60)) {
    valid = false;
    statusInput.classList.add("error-input");
    errorStatus.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }

  if (!checkRequired(subconstractorInput.value)) {
    valid = false;
    subconstractorInput.classList.add("error-input");
    errorSubconstractor.innerText = "Pole jest wymagane";
  } 

  if (!checkRequired(buildingInput.value)) {
    valid = false;
    buildingInput.classList.add("error-input");
    errorBuilding.innerText = "Pole jest wymagane";
  }

  if (!checkRequired(assumedRealizationDateInput.value)) {
    valid = false;
    assumedRealizationDateInput.classList.add("error-input");
    errorAssumedRealizationDate.innerText = "Pole jest wymagane";
  }

  if (!valid) {
    errorsSummary.innerText = "Formularz zawiera błędy";
  }

  return valid;
}
