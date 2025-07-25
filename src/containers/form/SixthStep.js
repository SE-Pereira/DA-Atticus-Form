import React, { useState, useEffect }  from "react";
import { ButtonGroup, Button } from "reactstrap";

const SixthStep = ({ validationError, formData, handleFieldChange }) => {
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
      const savedOption = sessionStorage.getItem('selectedOption6');
      if (savedOption) {
        setSelectedOption(savedOption);
      }
    }, [selectedOption]);
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter">
        <label className="questionLabel questionLabelLong">
          {formData.firstName}, are you receiving treatment for your medical
          condition?
        </label>
        <ButtonGroup className="buttonGroupDefault marginTop">
          <Button
            className="strapButtonText"
            id="button1"
            name="receivingTreatment"
            value="Yes"
            onClick={async (event) => {
              await handleFieldChange(
                "receivingTreatment",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem('selectedOption6', "Yes");
            }}
            style={selectedOption === 'Yes' ? activeButtonStyle : normalButtonStyle}
          >
            Yes
          </Button>
          <Button
            className="strapButtonText"
            id="button2"
            name="receivingTreatment"
            value="No"
            onClick={async (event) => {
              await handleFieldChange(
                "receivingTreatment",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem('selectedOption6', "No");
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

export default SixthStep;
