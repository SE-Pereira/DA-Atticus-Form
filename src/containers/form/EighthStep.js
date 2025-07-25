import React, { useEffect } from "react";
import { Input } from "reactstrap";
import EighthStepImage from "../../assets/images/STEP8.webp";

const EighthStep = ({ validationError, formData, handleFieldChange }) => {
  useEffect(() => {
    if (formData.zipCode === "") {
      document.querySelector(".nextButton").style.display = "none";
    } else {
      document.querySelector(".nextButton").style.display = "inline-block";
    }
    let inputField = document.querySelector(".inputField");
    if (inputField) {
      inputField.addEventListener("keypress", (event) => {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Trigger the button element with a click
          if (document.querySelector(".nextButton")) {
            document.querySelector(".nextButton").click();
          }
        }
      });
    }
  }, [formData.zipCode]);
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter">
        <img
          alt="We take pride in helping our clients secure over 1.5 billion in awards annually"
          className="sliderImage"
          src={EighthStepImage}
        ></img>
        <label className="questionLabel">
          What is your zip code? (Where you live can impact how fast your claim
          is processed.)
        </label>
        <Input
          className="textInput inputField"
          id="button1"
          name="zipCode"
          type="text"
          value={formData.zipCode}
          onChange={(event) => {
            handleFieldChange("zipCode", event.target.value, true);
          }}
        />
      </div>
      <div className="">
        <p className="errorTextAnswer">Please answer the question above</p>
        <p className="errorZipCodeText">Invalid Zipcode</p>
      </div>
    </div>
  );
};

export default EighthStep;
