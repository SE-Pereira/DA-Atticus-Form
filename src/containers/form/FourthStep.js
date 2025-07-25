import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "reactstrap";
import FourthStepImage from "../../assets/images/STEP4.webp";

const FourthStep = ({ validationError, formData, handleFieldChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const activeButtonStyle = {
    backgroundColor: "#1A66B1",
    color: "white",
  };
  const normalButtonStyle = {
    backgroundColor: "transparent",
  };
  useEffect(() => {
    if (selectedOption === null) {
      document.querySelector(".nextButton").style.display = "none";
    } else {
      document.querySelector(".nextButton").style.display = "inline-block";
    }
    // On load, check localStorage
    const savedOption = sessionStorage.getItem("selectedOption4");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, [selectedOption]);
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter">
        <img
          alt="Your work experience dpes not need to be continous to qualify"
          className="sliderImage"
          src={FourthStepImage}
        ></img>
        <label className="questionLabel">
          Have you worked for 5 out of the last 10 years? (Doesn't need to be
          consecutive)
        </label>
        <ButtonGroup className="buttonGroupDefault marginTop">
          <Button
            className="strapButtonText"
            id="button1"
            name="workedFiveYearsSince"
            value="Yes"
            onClick={async (event) => {
              await handleFieldChange(
                "workedFiveYearsSince",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption4", "Yes");
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
            name="workedFiveYearsSince"
            value="No"
            onClick={async (event) => {
              await handleFieldChange(
                "workedFiveYearsSince",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption4", "No");
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

export default FourthStep;
