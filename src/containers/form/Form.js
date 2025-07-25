import React, { useState, useEffect, useRef, useMemo } from "react";
import FirstStep from "../form/FirstStep";
import SecondStep from "../form/SecondStep";
import ThirdStep from "../form/ThirdStep";
import FourthStep from "../form/FourthStep";
import FifthStep from "../form/FifthStep";
import SixthStep from "../form/SixthStep";
import SeventhStep from "../form/SeventhStep";
import EighthStep from "../form/EighthStep";
import NinthStep from "../form/NinthStep";
import TenthStep from "../form/TenthStep";
import {
  checkIsValidFormSteps,
  updateErrorsFormSteps,
} from "../../services/manageValidation";
import StepController from "../stepController/stepController";

// Get parameters from the URL Search and return them in an object
const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    cc: params.get("cc") || "",
    rdt_cid: params.get("rdt_cid") || "",
    utm_ad_id: params.get("utm_ad_id") || "",
    utm_id: params.get("utm_id") || "",
    ttclid: params.get("ttclid") || "",
    gclid: params.get("gclid") || "",
    utm_term: params.get("utm_term") || "",
    fbclid: params.get("fbclid") || params.get("FBclid") || "",
    referringURL: document.referrer || "", // Captures referring URL
  };
};

// This is a flag to check if a row is being created or updated -
let isCreatingRow = false;
// This makes continunous updates to the sheet
const googleSheetUpdateMobile = async (payload) => {
  // Check what is not answered to determine where they left off -> Returns Step Number
  const getProperStepNum = (payload) => {
    if (
      payload.answers[
        "Are you currently receiving Social Security Disability benefits?"
      ] === ""
    ) {
      return "0";
    } else if (
      payload.answers[
        "Do you expect to be out of work for at least a year?"
      ] === ""
    ) {
      return 1;
    } else if (payload.answers["When did you stop working full time"] === "") {
      return 2;
    } else if (
      payload.answers["Have you worked for 5 out of the last 10 years?"] === ""
    ) {
      return 3;
    } else if (payload.answers["First Name"] === "") {
      return 4;
    } else if (
      payload.answers[
        "Are you receiving treatment for your medical condition?"
      ] === ""
    ) {
      return 5;
    } else if (
      payload.answers["What is the age of the person seeking benefits?"] === ""
    ) {
      return 6;
    } else if (payload.answers["postal_code"] === "") {
      return 7;
    } else if (
      payload.answers["Is an attorney helping you with your case or claim?"] ===
      ""
    ) {
      return 8;
    } else if (payload.answers["Last Name"] === "") {
      return 9;
    } else if (
      payload.answers["Last Name"] !== "" &&
      payload.answers["phoneNumber"] !== "" &&
      payload.answers["email"] !== ""
    ) {
      return 10;
    }
  };
  let callStepFun = getProperStepNum(payload);
  const currentDate = new Date();
  const dateMonth = currentDate.getMonth() + 1; // Months are zero-based
  const dateDay = currentDate.getDate();
  const dateYear = currentDate.getFullYear();
  const currentFormattedDate = `${dateMonth}/${dateDay}/${dateYear}`;
  function toLocalISOString(date = new Date()) {
    const pad = (n) => n.toString().padStart(2, "0");
    const padMs = (n) => n.toString().padStart(3, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const ms = padMs(date.getMilliseconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}`;
  }

  const data = {
    firstName: payload.answers.first_name1 || payload.answers.firstName,
    lastName: payload.answers["Last Name"],
    email: payload.answers.email_address,
    phoneNumber: payload.answers.phone_number,
    ip: payload.answers.ip,
    userAgent: payload.answers.user_agent,
    receivingSSDIBenefits:
      payload.answers[
        "Are you currently receiving Social Security Disability benefits?"
      ],
    outOfWork:
      payload.answers["Do you expect to be out of work for at least a year?"],
    lastYearWorkedFullTime:
      payload.answers["When did you stop working full time"],
    workedFiveYearsSince:
      payload.answers["Have you worked for 5 out of the last 10 years?"],
    receivingTreatment:
      payload.answers[
        "Are you receiving treatment for your medical condition?"
      ],
    ageRange:
      payload.answers["What is the age of the person seeking benefits?"],
    zipCode: payload.answers.postal_code,
    attorneyHelping:
      payload.answers["Is an attorney helping you with your case or claim?"],
    trustedForm: payload.trusted_form_certificate_url,
    utm_source: payload.answers.utm_source,
    utm_medium: payload.answers.utm_medium,
    utm_campaign: payload.answers.utm_campaign,
    utm_content: payload.answers.utm_content,
    utm_id: payload.answers.utm_id,
    utm_term: payload.answers.utm_term,
    fbclid: payload.answers.fbclid,
    referringURL: payload.answers.referrer,
    createdAt: toLocalISOString(),
    formattedDateString: currentFormattedDate,
    form_url: payload.form_url,
    unique_id: payload.unique_id,
    gclid: payload.answers.gclid,
    ttclid: payload.answers.ttclid,
    utm_ad_id: payload.answers.utm_ad_id,
    rdt_cid: payload.answers.rdt_cid,
    cc: payload.answers.cc,
    formName: payload.form_name,
    stepCounter: callStepFun,
    submitButtonTrue: Number(sessionStorage.getItem("currentStepCount")) === 10,
    isMobile: payload.isMobile,
    refresh: payload.refresh || false,
  };
  // production = process.env.REACT_APP_SHEETBEST_URL
  // dev = process.env.REACT_APP_SHEETBEST_URL_TESTING
  // process.env.REACT_APP_SHEETBEST_UR_SHEET_2
  const baseURL = process.env.REACT_APP_SHEETBEST_URL;
  // const baseURL2 = process.env.REACT_APP_SHEETBEST_UR_SHEET_2;
  const uniqueId = payload.unique_id;

  // Return early if POST is already in progress
  if (isCreatingRow) return;

  try {
    const rowCreatedCheck = sessionStorage.getItem("row_created_by_check");
    // Check if row exists in the Google Sheet
    // If variable is stored in session storage is means the first row was created if its not stored ->
    // then it will create the first row and store
    if (!rowCreatedCheck) {
      isCreatingRow = true; // block other requests
      // rowCreatedCheck doesn't exist in session storage so check the sheet to confirm
      const res = await fetch(`${baseURL}/unique_id/${uniqueId}`);
      const json = await res.json();
      if (json.length === 0) {
        // Row doesn't exist — create it
        await fetch(baseURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        // Test 2 url
        // await fetch(baseURL2, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(data),
        // });
      } else {
        // Row exists - We checked the sheet for the ID and it is there — update it
        await fetch(`${baseURL}/unique_id/${uniqueId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        // Test 2 url
        // await fetch(`${baseURL2}/unique_id/${uniqueId}`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(data),
        // });
      }
      sessionStorage.setItem("row_created_by_check", "true");
    } else {
      // Row was already created - Variable was found in local storage — just update
      await fetch(`${baseURL}/unique_id/${uniqueId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // Test 2 url
      // await fetch(`${baseURL2}/unique_id/${uniqueId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
    }
  } catch (error) {
    console.error("Error updating/creating row:", error);
  } finally {
    isCreatingRow = false;
  }
};

// Control form state and pass the step to the stepcontroller
const Form = () => {
  const [validationError, setValidationError] = useState([]);
  const [userIPAdress, setUserIPAdress] = useState("");
  const [trustedFormCert, setTrustedFormCert] = useState("");
  const refreshed =
    performance.getEntriesByType("navigation")[0]?.type === "reload";
  const userAgent = window.navigator.userAgent;
  // const currentDate = new Date();
  // const dateString = currentDate.toLocaleDateString();
  const formUrl = window.location.href;
  const urlWithoutParameters = formUrl.split("?")[0];
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  // This is the unique ID of the session for the form. If there is nothing in session storage then it will
  // create a new ID and save it in session storage. This way if the user refreshes we can update the google sheet based on the unique ID rather than creating a new duplicated row.
  const uniqueIdRef = useRef(
    sessionStorage.getItem("unique_id") || crypto.randomUUID()
  );
  // Get and parse form data from session storage -> like this if user refreshes we will save everything they
  // have answered so far
  const savedFormData = sessionStorage.getItem("formData");
  const parsedFormData = savedFormData ? JSON.parse(savedFormData) : null;

  const [formData, setFormData] = useState(() => ({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    receivingSSDIBenefits: "",
    outOfWork: "",
    lastYearWorked: "",
    workedFiveYearsSince: "",
    receivingTreatment: "",
    ageRange: "",
    zipCode: "",
    attorneyHelping: "",
    trustedForm: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    cc: "",
    utm_id: "",
    utm_ad_id: "",
    utm_term: "",
    fbclid: "",
    ttclid: "",
    rdt_cid: "",
    userAgent: userAgent,
    // created_at: new Date().toISOString(),
    // formattedDateString: dateString,
    form_url: urlWithoutParameters,
    unique_id: uniqueIdRef.current,
    isMobile: isMobile,
    refresh: false,
    ...(parsedFormData || {}), // Restore saved values
  }));
  useEffect(() => {
    // On load set the form data in session storage so we have it saved
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Payload for Zapier ->
  // useMemo is mostly used for memoization, kind of like caching a value -> This helps make functions not as "expensive" - useMemo updates after dependencies change.
  const payload = useMemo(() => {
    return {
      answers: {
        email_address: formData.email,
        ip: userIPAdress,
        first_name1: formData.firstName,
        utm_content: formData.utm_content,
        "First Name": formData.firstName,
        user_agent: userAgent,
        "Is an attorney helping you with your case or claim?":
          formData.attorneyHelping,
        utm_term: formData.utm_term,
        utm_campaign: formData.utm_campaign,
        cc: formData.cc,
        referrer: formData.referringURL,
        utm_medium: formData.utm_medium,
        utm_id: formData.utm_id,
        fbclid: formData.fbclid,
        "What is the age of the person seeking benefits?": formData.ageRange,
        "Last Name": formData.lastName,
        postal_code: formData.zipCode,
        "Are you receiving treatment for your medical condition?":
          formData.receivingTreatment,
        "When did you stop working full time": formData.lastYearWorked,
        "Have you worked for 5 out of the last 10 years?":
          formData.workedFiveYearsSince,
        phone_number: formData.phoneNumber,
        "Do you expect to be out of work for at least a year?":
          formData.outOfWork,
        utm_source: formData.utm_source,
        gclid: formData.gclid,
        ttclid: formData.ttclid,
        utm_ad_id: formData.utm_ad_id,
        "Are you currently receiving Social Security Disability benefits?":
          formData.receivingSSDIBenefits,
      },
      form_name: "Atticus Flow",
      trusted_form_certificate_url: formData.trustedForm,
      form_url: formData.form_url,
      unique_id: formData.unique_id,
      created_at: new Date().toISOString(),
      // formattedDateString: dateString,
      isMobile: formData.isMobile,
      refresh: formData.refresh,
    };
  }, [formData, userIPAdress, userAgent]);

  // This is default items we will clear like at the end of the form when the user is being redirected.
  // There are other items to clear like stepcount, unique ID and the form data but that won't always be called with this function below
  const clearStorage = () => {
    sessionStorage.removeItem("selectedOption1");
    sessionStorage.removeItem("selectedOption2");
    sessionStorage.removeItem("selectedOption3");
    sessionStorage.removeItem("selectedOption4");
    sessionStorage.removeItem("selectedOption6");
    sessionStorage.removeItem("selectedOption7");
    sessionStorage.removeItem("selectedOption9");
  };

  // Form change to update state
  const handleFieldChange = (name, value, isRequired) => {
    let valueChange = value;
    setFormData({ ...formData, [name]: valueChange });
    // setValidationError creates a new array excluding any error for a certain field. It's used when a user corrects a previously invalid input.
    isRequired &&
      setValidationError(
        validationError.filter((errorItem) => errorItem !== name)
      );
  };

  // Step validation
  const manageNextStepValidation = (step) => {
    const isValid = checkIsValidFormSteps({ formData, step });
    // If not valid meaning its empty or it doesn't pass the standard or desired output
    if (!isValid) {
      // Check for proper zipcode
      let zipCodeCheckRegex = /[a-zA-Z]/g;
      if (step === 8 && formData.zipCode === "") {
        // If the zip code input is empty, we need to show an error message
        document.querySelector(".errorTextAnswer").style.display = "block";
        document.querySelector(".errorZipCodeText").style.display = "none";
      } else if (
        step === 8 &&
        zipCodeCheckRegex.test(formData.zipCode) !== ""
      ) {
        // If the zip code is not valid, we need to show an error message
        document.querySelector(".errorZipCodeText").style.display = "block";
        document.querySelector(".errorTextAnswer").style.display = "none";
      }

      // Regex for email and phone number
      let emailCheckRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const oldPhoneNumber = formData.phoneNumber; // The phone validation is done on step 10 but the logic is here
      let phoneCheckRegex =
        /^\+?(\d{1,3})?[-. (]?(\d{3})[-. )]?(\d{3})[-. ]?(\d{4})$/;
      // check for proper email
      if (step === 10 && formData.email === "") {
        // If the email input is empty, we need to show an error message
        document.querySelector(".errorTextAnswer").style.display = "block";
        document.querySelector(".errorEmailText").style.display = "none";
      } else if (
        step === 10 &&
        emailCheckRegex.test(formData.email) === false &&
        formData.email !== ""
      ) {
        // If the email is not valid, we need to show an error message
        document.querySelector(".errorEmailText").style.display = "block";
        document.querySelector(".errorTextAnswer").style.display = "none";
      }

      if (step === 10 && oldPhoneNumber === "") {
        // If the phone number input is empty, we need to show an error message
        document.querySelector(".errorTextAnswer").style.display = "block";
        document.querySelector(".errorPhoneText").style.display = "none";
      } else if (
        step === 10 &&
        phoneCheckRegex.test(oldPhoneNumber) === false &&
        oldPhoneNumber !== ""
      ) {
        // If the phone number is not valid but the user entered something, we need to show an error message
        document.querySelector(".errorPhoneText").style.display = "block";
        document.querySelector(".errorTextAnswer").style.display = "none";
      } else if (
        step === 10 &&
        phoneCheckRegex.test(oldPhoneNumber) === true &&
        oldPhoneNumber !== ""
      ) {
        // If the phone number is valid hide the error message
        document.querySelector(".errorPhoneText").style.display = "none";
      }
      // We don't really need this anymore since the manage validation was updated but this makes sure last name is filled out
      if (step === 10 && formData.lastName === "") {
        document.querySelector(".errorTextAnswer").style.display = "block";
      }
      //

      // Default error message asking to answer the quesiton - This is the parent of .errorText
      if (document.querySelector(".errorTextContainer")) {
        document.querySelector(".errorTextContainer").style.display = "block";
      }
      // Default error message asking to answer the quesiton
      if (document.querySelector(".errorText")) {
        document.querySelector(".errorText").style.display = "block";
      }
      // Check if the step has the ID "button1", "button2", "button3", "button4", "button5" etc...
      // If the step is not valid, we need to highlight the buttons depending on what ID the steps have
      // This should be updated to improve the performance of the code.......
      if (
        document.querySelector("#button1") &&
        !document.querySelector("#button2")
      ) {
        document.querySelector("#button1").style.border = "1px red solid";
      } else if (
        document.querySelector("#button1") &&
        document.querySelector("#button2") &&
        !document.querySelector("#button3")
      ) {
        document.querySelector("#button1").style.border = "1px red solid";
        document.querySelector("#button2").style.border = "1px red solid";
      } else if (
        document.querySelector("#button2") &&
        document.querySelector("#button3") &&
        !document.querySelector("#button4")
      ) {
        document.querySelector("#button1").style.border = "1px red solid";
        document.querySelector("#button2").style.border = "1px red solid";
        document.querySelector("#button3").style.border = "1px red solid";
      } else if (
        document.querySelector("#button2") &&
        document.querySelector("#button3") &&
        document.querySelector("#button4") &&
        !document.querySelector("#button5")
      ) {
        document.querySelector("#button1").style.border = "1px red solid";
        document.querySelector("#button2").style.border = "1px red solid";
        document.querySelector("#button3").style.border = "1px red solid";
        document.querySelector("#button4").style.border = "1px red solid";
      } else if (
        document.querySelector("#button5") &&
        !document.querySelector("#button6")
      ) {
        document.querySelector("#button1").style.border = "1px red solid";
        document.querySelector("#button2").style.border = "1px red solid";
        document.querySelector("#button3").style.border = "1px red solid";
        document.querySelector("#button4").style.border = "1px red solid";
        document.querySelector("#button5").style.border = "1px red solid";
      } else if (document.querySelector("#button7")) {
        document.querySelector("#button1").style.border = "1px red solid";
        document.querySelector("#button2").style.border = "1px red solid";
        document.querySelector("#button3").style.border = "1px red solid";
        document.querySelector("#button4").style.border = "1px red solid";
        document.querySelector("#button5").style.border = "1px red solid";
        document.querySelector("#button6").style.border = "1px red solid";
        document.querySelector("#button7").style.border = "1px red solid";
      }
      // Update the errors and return false menaing user question didn't pass validation
      updateErrorsFormSteps({
        formData,
        step,
        setValidationError,
      });
      return false;
    }
    // Valid and not step 10 - the difference is the below conditional calls handleSubmit to finish the form
    // I could remove the "&& step !== 10" from this conditional to trigger everywhere.

    // If step is 1 and they answered add a small delay to not cause dups in the sheet
    // if (isValid && step === 1) {
    //   setTimeout(() => {
    //     googleSheetUpdateMobile(payload);
    //   }, 800); // 800ms delay
    // }
    // if (isValid && step !== 10) {
    //   googleSheetUpdateMobile(payload);
    // }
    // If its the last step and everything is valid call the function to submit the form and update the sheet
    if (step === 10 && isValid) {
      // googleSheetUpdateMobile(payload);
      handleSubmit();
    }
    // Passes validation
    return true;
  };

  // Send payload to Zapier and redirect user
  const sendToZapier = async (payload) => {
    // const devURL = process.env.REACT_APP_CLOUD_WEBHOOK;
    const zapierURL = process.env.REACT_APP_ZAPIER_URL;
    try {
      await fetch(zapierURL, {
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to send to Zapier");
          }
          console.log("Successfully sent to Zapier!");
          console.log(res);
        })
        .catch((err) => {
          console.error("Zapier post error", err);
        });
      return;
    } catch (e) {
      console.log(e);
    } finally {
      // Redirect user to the next page based on response from form
      if (
        formData.attorneyHelping === "Yes" ||
        formData.outOfWork === "No" ||
        formData.workedFiveYearsSince === "No" ||
        formData.receivingSSDIBenefits === "Yes"
      ) {
        // Redirect to not qualified page
        window.location.href =
          "https://www.citizensdisability.com/seclp-lp-ty-universal/";
      } else {
        // Redirect to qualified page
        window.location.href =
          "https://www.citizensdisability.com/sec-thank-you-dti-copy/";
      }
      // Clear Session storage and reset form data
      clearStorage();
      localStorage.removeItem("row_created_by_check");
      sessionStorage.removeItem("unique_id");
      sessionStorage.removeItem("formData");
      sessionStorage.removeItem("currentStep");
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        receivingSSDIBenefits: "",
        outOfWork: "",
        lastYearWorked: "",
        workedFiveYearsSince: "",
        receivingTreatment: "",
        ageRange: "",
        zipCode: "",
        attorneyHelping: "",
        trustedForm: "",
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
        cc: "",
        utm_id: "",
        utm_ad_id: "",
        utm_term: "",
        fbclid: "",
        ttclid: "",
        rdt_cid: "",
        userAgent: userAgent,
        createdAt: new Date(),
        form_url: urlWithoutParameters,
        unique_id: uniqueIdRef.current,
        isMobile: isMobile,
        refresh: false,
      });
    }
  };

  // Form Submit / Brings IP Adress and calls zapier function / Also gets the Date
  const handleSubmit = async () => {
    setTimeout(() => {
      sendToZapier(payload);
    }, 1500); // Delay
    // await sendToZapier(payload);
    return;
  };

  // When a user loads into the page create a row in the Google Sheet -> Only on first load. This is used for tracking purposes
  // useEffect(() => {
  //   // We want to make sure formData.refresh is false because if they answer the first question and refresh we don't want a 2 row being created.
  //   if (
  //     sessionStorage.getItem("currentStepCount") === "1" &&
  //     formData.refresh === false
  //   ) {
  //     const handleLoad = () => {
  //       googleSheetUpdateMobile(payload);
  //     };

  //     window.addEventListener("load", handleLoad);
  //     return () => {
  //       window.removeEventListener("load", handleLoad);
  //     };
  //   }
  // }, [formData.refresh, payload]);

  // Form steps
  const steps = [
    <FirstStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
    <SecondStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
    <ThirdStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
    <FourthStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
    <FifthStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
    <SixthStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
    <SeventhStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
    <EighthStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
    <NinthStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
    <TenthStep
      formData={formData}
      validationError={validationError}
      handleFieldChange={handleFieldChange}
    />,
  ];

  useEffect(() => {
    // Set unique ID
    sessionStorage.setItem("unique_id", uniqueIdRef.current);
    // Listen to a refresh and if they did then set the value as true
    const didRefresh = () => {
      setFormData((prev) => ({
        ...prev,
        refresh: refreshed,
      }));
      clearStorage();
    };
    window.addEventListener("load", didRefresh);

    // Get User IP Address and call the function
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://geolocation-db.com/json/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserIPAdress(data.IPv4); // Update state with IP
      } catch (e) {
        console.log("IP fetch error:", e);
      }
    };
    fetchIpAddress();

    // Call utm parameter function and update state with utm parameters from the function
    const utmParams = getUTMParams();
    setFormData((prevData) => ({ ...prevData, ...utmParams }));

    // Trusted form cert function
    const getTrustedFormCertValue = () => {
      const inputField = document.getElementById("xxTrustedFormCertUrl_0");
      return inputField ? inputField.value : "";
    };

    // Wait for TrustedForm to inject the value
    const interval = setInterval(() => {
      const certValue = getTrustedFormCertValue();
      if (certValue) {
        // Update state and form data
        setTrustedFormCert(certValue); // Update trusted form state with cert
        setFormData((prevData) => ({ ...prevData, trustedForm: certValue })); // Update form data state with cert
        clearInterval(interval); // Stop checking once value is set
      }
    }, 500); // Check every 500ms
    return () => clearInterval(interval); // Cleanup interval when component unmounts
  }, [trustedFormCert, refreshed]);
  return (
    <>
      <div className="minHeightContainer" style={{ width: "100%" }}>
        <StepController
          className="stepControllerMobile"
          formTitle="Atticus Flow Form"
          manageNextStepValidation={manageNextStepValidation}
          steps={steps}
          stepsAmount={10}
        />
        <form style={{ width: "100%" }}>
          <input
            type="hidden"
            name="xxTrustedFormCertUrlAdded"
            id="xxTrustedFormCertUrlAdded_0"
            value={trustedFormCert}
          />
        </form>
      </div>
    </>
  );
};

export default Form;
