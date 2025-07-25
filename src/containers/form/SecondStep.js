import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "reactstrap";
import SecondStepImage from "../../assets/images/STEP2.webp";

const SecondStep = ({ validationError, formData, handleFieldChange }) => {
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
      const savedOption = sessionStorage.getItem('selectedOption2');
      if (savedOption) {
        setSelectedOption(savedOption);
      }
    }, [selectedOption]);
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter">
        <img alt="Lets talk about your work history" className="sliderImage" src={SecondStepImage}></img>
        <label className="questionLabel">
          Do you expect to be out of work for at least a year?
        </label>
        <ButtonGroup className="buttonGroupDefault marginTop">
          <Button
            className="strapButtonText"
            id="button1"
            name="outOfWork"
            value="Yes"
            onClick={async (event) => {
              await handleFieldChange("outOfWork", event.target.value, true);
              document.querySelector(".nextButton").click();
              sessionStorage.setItem('selectedOption2', "Yes");
            }}
            style={selectedOption === 'Yes' ? activeButtonStyle : normalButtonStyle}
          >
            Yes
          </Button>
          <Button
            className="strapButtonText"
            id="button2"
            name="outOfWork"
            value="No"
            onClick={async (event) => {
              await handleFieldChange("outOfWork", event.target.value, true);
              document.querySelector(".nextButton").click();
              sessionStorage.setItem('selectedOption2', "No");
            }}
            style={selectedOption === 'No' ? activeButtonStyle : normalButtonStyle}
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

export default SecondStep;
