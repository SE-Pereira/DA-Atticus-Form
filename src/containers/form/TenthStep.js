import React, { useEffect } from "react";
import { Input } from "reactstrap";
import LockIcon from "../../assets/images/LOCKICON.webp";

const TenthStep = ({ validationError, formData, handleFieldChange }) => {
  // const [trustedFormCert, setTrustedFormCert] = useState("");

  // Validate Phone number for Button by returning a boolean -> true or false
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex =
      /^\+?(\d{1,3})?[-. (]?(\d{3})[-. )]?(\d{3})[-. ]?(\d{4})$/;
    return phoneNumberRegex.test(phoneNumber);
  };
  // Validate Email for Button by returning a boolean -> true or false
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Format phone number XXX-XXX-XXXX
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");

    // Format as (XXX-XXX-XXXX)
    let formattedNumber = cleaned;
    if (cleaned.length > 6) {
      formattedNumber = `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length > 3) {
      formattedNumber = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    }

    return formattedNumber;
  };

  // Update the state and handle field change
  const handlePhoneChange = (event) => {
    const formattedNumber = formatPhoneNumber(event.target.value);
    handleFieldChange("phoneNumber", formattedNumber, true);
  };
  // Condiitonal to check if all fields are filled and valid

  useEffect(() => {
    if (
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.phoneNumber !== "" &&
      validatePhoneNumber(formData.phoneNumber) === true &&
      formData.email !== "" &&
      validateEmail(formData.email) === true
    ) {
      // Show the submit button completely
      if (document.querySelector(".tenthStepSubmitButton")) {
        document.querySelector(".tenthStepSubmitButton").style.opacity = "1";
      }
    }
    // Update the button css to be the submit and hide arrow
    const submitButton = document.querySelector(".nextButton");
    if (submitButton) {
      submitButton.classList.add("tenthStepSubmitButton");
      document.querySelector(".tenthStepSubmitButton").style.zIndex = "99";
      document.querySelector(".tenthStepSubmitButton").style.display =
        "inline-block";
      document.querySelector(".nextArrow").style.display = "none";

      const targetDiv = document.querySelector(".submitButtonContainer");
      if (targetDiv) {
        targetDiv.appendChild(submitButton);
      }
    }
    const backButtonClick = document.querySelector(".backButton");
    backButtonClick.addEventListener("click", () => {
      const submitButton = document.querySelector(".nextButton");
      const buttonParent = document.querySelector(".stepControllerArrows");
      if (submitButton && buttonParent) {
        buttonParent.appendChild(submitButton);
        buttonParent.style.flexDirection = "row";
      }
    });

    if (window.innerWidth <= 767) {
      const footer = document.querySelector(".footerParent");
      if (footer) {
        footer.style.marginTop = "200px";
      }
    }
    const minHeightContainer = document.querySelector(".minHeightContainer");
    if (minHeightContainer) {
      if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Mobile
        minHeightContainer.style.minHeight = "1200px"; // Back to mobile min height
        minHeightContainer.style.maxHeight = "1250px"; // Back to mobile max height
      } else {
        // Desktop
        minHeightContainer.style.minHeight = "900px"; // Ensure full height for the step
        minHeightContainer.style.maxHeight = "950px"; // Ensure full height for the step
      }
    }
  }, [
    handleFieldChange,
    formData.phoneNumber,
    formData.email,
    formData.firstName,
    formData.lastName,
  ]); // Dependency for useEffect
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter stepHeaderContainer">
        <p className="questionLabel headerTextBenefits">It looks like we can help you in your journey to get benefits. We'll
        need to connect to go through a few more details.</p>
        {/* {formData.attorneyHelping === "Yes" ||
        formData.outOfWork === "No" ||
        formData.workedFiveYearsSince === "No" ||
        formData.receivingSSDIBenefits === "Yes" ? (
          <p className="questionLabel headerTextBenefits">
            It looks like we can help you in your journey to get benefits. We'll
            need to connect to go through a few more details.
          </p>
        ) : (
          <p className="questionLabel headerTextBenefits">
            You have a strong chance to qualify for SSDI based on your answers.
            Please provide your contact information so we can discuss next steps
            and start the process!
          </p>
        )} */}
      </div>
      <div className="nameInputContainerPII mobileInputWidthStepTenParent">
        <Input
          required
          className="textInput inputField mobileInputWidthStepTen"
          id="button1"
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(event) => {
            handleFieldChange("firstName", event.target.value, true);
          }}
        />
        <Input
          required
          className="textInput inputField mobileInputWidthStepTen"
          id="button2"
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(event) => {
            handleFieldChange("lastName", event.target.value, true);
          }}
        />
      </div>
      <div className="emailPhoneInputContainerPII mobileInputWidthStepTenParent">
        <Input
          className="textInput inputField mobileInputWidthStepTen phoneNumberField"
          id="button3"
          name="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          required
        />
        <Input
          className="textInput inputField mobileInputWidthStepTen"
          id="button4"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(event) => {
            handleFieldChange("email", event.target.value, true);
          }}
        />
      </div>
      <div>
        <span className="errorTextAnswer">
          Please answer the question above
        </span>
        <span className="errorEmailText">Invalid Email</span>
        <span className="errorPhoneText">Invalid Phone Number</span>
      </div>
      <div className="smallButtonClickDisclaimer">
        <p className="smallButtonClickDisclaimerText customText">
          By clicking the "FREE CONSULTATION" button, I agree to be contacted by
          Citizens Disability per the terms below.
        </p>
      </div>
      <div className="submitButtonContainer"></div>

      <div className="displayRowColumn justifyContent alignCenter lockIconTextParent">
        <img alt="Lock" className="lockIconImage" src={LockIcon}></img>
        <p className="protectedPII">
          Your personal information is protected by encrypted SSL
        </p>
      </div>

      <div className="majorDisclaimerTextParentContainer">
        <p className="majorDisclaimerText">
          By clicking "FREE CONSULTATION" above I am providing my ESIGN
          signature and express written consent agreement to permit Citizens
          Disability, LLC to contact me at the number provided above for
          marketing purposes regarding Citizens Disability services, including a
          disability claim, benefits optimization, Medicare, and/or pharmacy
          services, and customer care messages, such as information and
          reminders regarding your disability claim. I understand that these
          calls and/or SMS/MMS messages include those using automated
          technology, AI generative voice, and prerecorded and/or artificial
          voice messages. I confirm that the phone number above is accurate, and
          I am the regular user of that phone. I also agree to Citizens
          Disability's{" "}
          <a
            className="majorDisclaimerTextAnchorTag"
            href="https://citizensdisability.com/sms-terms-and-conditions/"
          >
            SMS Terms and Conditions
          </a>
          and
          <a
            className="majorDisclaimerTextAnchorTag"
            href="https://citizensdisability.com/privacy-policy/"
          >
            Privacy Policy
          </a>
          . For SMS messages campaigns, text "STOP" to stop and "HELP" for help.
          Message frequency may vary. Msg & data rates may apply. I acknowledge
          that my consent is not required to obtain any good or service, and to
          contact Citizens Disability without providing consent I can call{" "}
          <a className="majorDisclaimerTextAnchorTag" href="tel:18004923260">
            1-800-492-3260
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TenthStep;
