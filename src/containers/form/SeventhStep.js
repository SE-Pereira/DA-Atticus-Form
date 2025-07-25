import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "reactstrap";

const SeventhStep = ({ validationError, formData, handleFieldChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
    const activeButtonStyle = {
      backgroundColor: '#1A66B1',
      color:'white'
    };
    const normalButtonStyle = {
      backgroundColor: 'transparent',
    };
    useEffect(() => {
      if(selectedOption === null) {
        document.querySelector(".nextButton").style.display = "none";
      } else {
        document.querySelector(".nextButton").style.display = "inline-block";
      }
      // On load, check localStorage
      const savedOption = sessionStorage.getItem('selectedOption7');
      if (savedOption) {
        setSelectedOption(savedOption);
      }
    }, [selectedOption]);
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter">
        <label className="questionLabel questionLabelLong">
          What age range do you fall into, {formData.firstName}?
        </label>
        <ButtonGroup className="buttonGroupDefaultCustomTablet marginTop ageRangeGroup">
          <Button
            className="strapButtonText"
            id="button1"
            name="ageRange"
            value="under_50"
            onClick={async (event) => {
              await handleFieldChange("ageRange", event.target.value, true);
              document.querySelector(".nextButton").click();
              sessionStorage.setItem('selectedOption7', "under_50");
            }}
            style={selectedOption === 'under_50' ? activeButtonStyle : normalButtonStyle}
          >
            Under 50
          </Button>
          <Button
            className="strapButtonText"
            id="button2"
            name="ageRange"
            value="50_54"
            onClick={async (event) => {
              await handleFieldChange("ageRange", event.target.value, true);
              document.querySelector(".nextButton").click();
              sessionStorage.setItem('selectedOption7', "50_54");
            }}
            style={selectedOption === '50_54' ? activeButtonStyle : normalButtonStyle}
          >
            50-54
          </Button>
          <Button
            className="strapButtonText"
            id="button3"
            name="ageRange"
            value="55_59"
            onClick={async (event) => {
              await handleFieldChange("ageRange", event.target.value, true);
              document.querySelector(".nextButton").click();
              sessionStorage.setItem('selectedOption7', "55_59");
            }}
            style={selectedOption === '55_59' ? activeButtonStyle : normalButtonStyle}
          >
            55-59
          </Button>
          <Button
            className="strapButtonText"
            id="button4"
            name="ageRange"
            value="60_64"
            onClick={async (event) => {
              await handleFieldChange("ageRange", event.target.value, true);
              document.querySelector(".nextButton").click();
              sessionStorage.setItem('selectedOption7', "60_64");
            }}
            style={selectedOption === '60_64' ? activeButtonStyle : normalButtonStyle}
          >
            60-64
          </Button>
          <Button
            className="strapButtonText"
            id="button5"
            name="ageRange"
            value="65_or_older"
            onClick={async (event) => {
              await handleFieldChange("ageRange", event.target.value, true);
              document.querySelector(".nextButton").click();
              sessionStorage.setItem('selectedOption7', "65_or_older");
            }}
            style={selectedOption === '65_or_older' ? activeButtonStyle : normalButtonStyle}
          >
            65 or older
          </Button>
        </ButtonGroup>
        <div className="errorTextContainer">
          <p className="errorText">Please answer the question above</p>
        </div>
      </div>
    </div>
  );
};

export default SeventhStep;
