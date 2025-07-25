import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "reactstrap";
import NinthStepImage from "../../assets/images/STEP9.webp";

const NinthStep = ({ validationError, formData, handleFieldChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const activeButtonStyle = {
    backgroundColor: "#1A66B1",
    color: "white",
  };
  const normalButtonStyle = {
    backgroundColor: "transparent",
  };
  useEffect(() => {
    // Remove the submit button styling applied on step 10 -> This is encase the user goes back a step
    if (document.querySelector(".tenthStepSubmitButton")) {
      document
        .querySelector(".tenthStepSubmitButton")
        .classList.remove("tenthStepSubmitButton");
      document.querySelector(".nextArrow").style.display = "inline-block";
    }

    if (window.innerWidth <= 767) {
      const footer = document.querySelector(".footerParent");
      if (footer) {
        footer.style.marginTop = "0px";
      }
    }

    if (selectedOption === null && document.querySelector(".nextButton")) {
      document.querySelector(".nextButton").style.display = "none";
    } else if (
      selectedOption !== null &&
      document.querySelector(".nextButton")
    ) {
      document.querySelector(".nextButton").style.display = "inline-block";
    }

    const minHeightContainer = document.querySelector(".minHeightContainer");
    if (minHeightContainer) {
      if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Mobile
        minHeightContainer.style.minHeight = "300px"; // Back to mobile min height
        minHeightContainer.style.maxHeight = "650px"; // Back to mobile max height
      } else {
        // Desktop
        minHeightContainer.style.minHeight = "650px"; // Back to mobile min height
        minHeightContainer.style.maxHeight = "650px"; // Back to mobile max height
      }
    }
    // On load, check localStorage
    const savedOption = sessionStorage.getItem("selectedOption9");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, [selectedOption]);
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter">
        <img
          alt="Applicants have an oveer 3x better chance of getting approved with an attorney or certified disability advocate"
          className="sliderImage"
          src={NinthStepImage}
        ></img>
        <label className="questionLabel">
          {formData.firstName}, is an attorney currently helping you with your
          case or claim?
        </label>
        <ButtonGroup className="buttonGroupDefault marginTop">
          <Button
            className="strapButtonText"
            id="button1"
            name="attorneyHelping"
            value="Yes"
            onClick={async (event) => {
              await handleFieldChange(
                "attorneyHelping",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption9", "Yes");
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
            name="attorneyHelping"
            value="No"
            onClick={async (event) => {
              await handleFieldChange(
                "attorneyHelping",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption9", "No");
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
      </div>
    </div>
  );
};

export default NinthStep;
