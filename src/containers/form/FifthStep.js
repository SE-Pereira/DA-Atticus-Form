import React, { useEffect } from "react";
import { Input } from "reactstrap";
import FifthStepImage from "../../assets/images/STEP5.webp";

const FifthStep = ({ validationError, formData, handleFieldChange }) => {
  useEffect(() => {
    if (formData.firstName === "") {
      document.querySelector(".nextButton").style.display = "none";
    } else {
      document.querySelector(".nextButton").style.display = "inline-block";
    }
    let inputField = document.querySelector(".inputField");
    if (inputField) {
      inputField.addEventListener("keypress", (event) => {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter" && formData.firstName !== "") {
          // Trigger the button element with a click
          if (document.querySelector(".nextButton")) {
            document.querySelector(".nextButton").click();
          }
        }
      });
    }
  }, [formData.firstName]);
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter">
        <img
          alt="Did you know over 90% of our clients win beenfits when they complete the process with us?"
          className="sliderImage"
          src={FifthStepImage}
        ></img>
        <label className="questionLabel textAlignLeft">
          What's your first name?
        </label>
        <Input
          className="textInput inputField"
          id="button1"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={(event) => {
            handleFieldChange("firstName", event.target.value, true);
          }}
        />
      </div>
      <div className="errorTextContainer">
        <p className="errorText">Please answer the question above</p>
      </div>
    </div>
  );
};

export default FifthStep;
