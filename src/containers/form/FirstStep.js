import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "reactstrap";
import FirstStepImage from "../../assets/images/STEP1.webp";

const FirstStep = ({ validationError, formData, handleFieldChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  // Button styling
  const activeButtonStyle = {
    backgroundColor: "#1A66B1",
    color: "white",
  };
  const normalButtonStyle = {
    backgroundColor: "transparent",
  };
  useEffect(() => {
    // If the user hasn't selected anything hide the button so they don't move on. This is on all questions
    if (selectedOption === null) {
      document.querySelector(".nextButton").style.display = "none";
    } else {
      document.querySelector(".nextButton").style.display = "inline-block";
    }
    // Update button styling based on user choice this way when going back a question a user know what they choose. We save this is session storage. This is on all questions.
    // On load, check session storage
    const savedOption = sessionStorage.getItem("selectedOption1");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, [selectedOption]);
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter">
        <p className="joinSSDI customText">
          Join The 100,000+ People We Have Helped Get Social Security Disability
          Benefits
        </p>
        <img
          alt="Jordan Top SSDI Attorney. Take 2 minutes to see if you qualify"
          className="sliderImage"
          src={FirstStepImage}
        ></img>
        <label className="questionLabel">
          Are you currently receiving Social Security Disability (SSDI)
          benefits?
        </label>
        <ButtonGroup
          id="receivingSSDIBenefitsButtonGroup"
          className="buttonGroupDefault marginTop"
        >
          <Button
            className="strapButtonText"
            id="button1"
            name="receivingSSDIBenefits"
            value="Yes"
            onClick={async (event) => {
              await handleFieldChange(
                "receivingSSDIBenefits",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption1", "Yes");
            }}
            style={
              selectedOption === "Yes" ? activeButtonStyle : normalButtonStyle
            }
          >
            Yes
          </Button>
          <Button
            className="strapButtonText"
            id="button2"
            name="receivingSSDIBenefits"
            value="No"
            onClick={async (event) => {
              await handleFieldChange(
                "receivingSSDIBenefits",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption1", "No");
            }}
            style={
              selectedOption === "No" ? activeButtonStyle : normalButtonStyle
            }
          >
            No
          </Button>
        </ButtonGroup>
        <div className="errorTextContainer">
          <p className="errorText">Please answer the question above</p>
        </div>
        <input
          type="hidden"
          name="utm_source"
          id="utm_source"
          value={formData.utm_source || ""}
        />
        <input
          type="hidden"
          name="utm_medium"
          id="utm_medium"
          value={formData.utm_medium || ""}
        />
        <input
          type="hidden"
          name="utm_campaign"
          id="utm_campaign"
          value={formData.utm_campaign || ""}
        />
        <input
          type="hidden"
          name="utm_content"
          id="utm_content"
          value={formData.utm_content || ""}
        />
        <input type="hidden" name="cc" id="cc" value={formData.cc || ""} />
        <input
          type="hidden"
          name="utm_id"
          id="utm_id"
          value={formData.utm_id || ""}
        />
        <input
          type="hidden"
          name="utm_term"
          id="utm_term"
          value={formData.utm_term || ""}
        />
        <input
          type="hidden"
          name="fbclid"
          id="fbclid"
          value={formData.fbclid || ""}
        />
      </div>
    </div>
  );
};

export default FirstStep;
