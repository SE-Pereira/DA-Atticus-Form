// Validate email through regex -> only used on this page
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
// Validate phone number through regex and make sure it doesnt start with a 1 or 0
const validatePhoneNumber = (phoneNumber) => {
  if(phoneNumber.charAt(0) === '1' || phoneNumber.charAt(0) === '0'){
    return false;
  }
  const phoneNumberRegex =
    /^\+?(\d{1,3})?[-. (]?(\d{3})[-. )]?(\d{3})[-. ]?(\d{4})$/;
  return phoneNumberRegex.test(phoneNumber);
};
// Validate zipcode through regex -> only used on this page
const validateZipCode = (zipCode) => {
  const zipcodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
  return zipcodeRegex.test(zipCode);
};
// Get the errors from the state based on the keys provided
const getErrors = (state, keys) => {
  return Object.entries(state)
    .filter(([key]) => keys.includes(key))
    .filter(([key, value]) =>
      key === "email" ? !validateEmail(value) : !value?.length
    )
    .map(([key]) => key);
};
// 
const cancelValidationError = (
  filterType,
  setValidationError,
  validationError
) => {
  setValidationError(
    validationError.filter((errorItem) => errorItem !== filterType)
  );
};
// Make sure the form steps are valid and calls the validateEmail, validatePhoneNumber and validateZipCode functions
// This makes sure the following data is filled out and validating them with the function makes sure its correct
const checkIsValidFormSteps = ({ formData, step }) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    receivingSSDIBenefits,
    outOfWork,
    lastYearWorked,
    workedFiveYearsSince,
    receivingTreatment,
    ageRange,
    zipCode,
    attorneyHelping,
  } = formData;

  if (step === 1) {
    return !!receivingSSDIBenefits;
  }
  if (step === 2) {
    return !!outOfWork;
  }
  if (step === 3) {
    return !!lastYearWorked;
  }
  if (step === 4) {
    return !!workedFiveYearsSince;
  }
  if (step === 5) {
    return !!firstName;
  }
  if (step === 6) {
    return !!receivingTreatment;
  }
  if (step === 7) {
    return !!ageRange;
  }
  if (step === 8) {
    return !!validateZipCode(zipCode);
  }
  if (step === 9) {
    return !!attorneyHelping;
  }
  if (step === 10) {
    return !!validateEmail(email) && !!lastName && !!validatePhoneNumber(phoneNumber);
  }
};
// Update the validation errors for each step based on the form data
const updateErrorsFormSteps = ({ formData, setValidationError, step }) => {
  if (step === 1) {
    const errors = getErrors(formData, ["receivingSSDIBenefits"]);
    setValidationError(errors);
  }
  if (step === 2) {
    const errors = getErrors(formData, ["outOfWork"]);
    setValidationError(errors);
  }
  if (step === 3) {
    const errors = getErrors(formData, ["lastYearWorked"]);
    setValidationError(errors);
  }
  if (step === 4) {
    const errors = getErrors(formData, ["workedFiveYearsSince"]);
    setValidationError(errors);
  }
  if (step === 5) {
    const errors = getErrors(formData, ["firstName"]);
    setValidationError(errors);
  }
  if (step === 6) {
    const errors = getErrors(formData, ["receivingTreatment"]);
    setValidationError(errors);
  }
  if (step === 7) {
    const errors = getErrors(formData, ["ageRange"]);
    setValidationError(errors);
  }
  if (step === 8) {
    const errors = getErrors(formData, ["zipCode"]);
    setValidationError(errors);
  }
  if (step === 9) {
    const errors = getErrors(formData, ["attorneyHelping"]);
    setValidationError(errors);
  }
  if (step === 10) {
    const errors = getErrors(formData, [
      "email",
      "firstName",
      "lastName",
      "phoneNumber",
    ]);
    setValidationError(errors);
  }
};

export { cancelValidationError, checkIsValidFormSteps, updateErrorsFormSteps };
