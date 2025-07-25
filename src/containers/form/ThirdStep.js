import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "reactstrap";

const ThridStep = ({ validationError, formData, handleFieldChange }) => {
   const [selectedOption, setSelectedOption] = useState("NA");
    const activeButtonStyle = {
      backgroundColor: "#1A66B1",
      color: "white",
    };
    const normalButtonStyle = {
      backgroundColor: "transparent",
    };
  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   handleFieldChange("lastYearWorked", event.target.value, true);
  //   // document.querySelector(".nextButton").click();
  //   sessionStorage.setItem("selectedOption3", event.target.value);
  //   setSelectedOption(event.target.value);
  // };

  useEffect(() => {
    if (selectedOption === null || selectedOption === "NA" || selectedOption === "NA") {
      document.querySelector(".nextButton").style.display = "none";
    } else {
      document.querySelector(".nextButton").style.display = "inline-block";
    }
    // On load, check localStorage
    const savedOption = sessionStorage.getItem("selectedOption3");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, [selectedOption]);
  return (
    <div className="fullWidth fullHeight">
      <div className="displayFlexColumn alignCenter">
        <label className="questionLabel questionLabelLong">
          What was the last year in which you worked?
        </label>

        {/* <div>
          <select
            className="selectDropDown"
            // style={{ marginTop: "20px", width: "300px", textAlign: "center"}}
            id="options"
            value={selectedOption}
            onChange={handleChange}
          >
            <option
              // className="selectOptions"
              onClick={async (event) => {
                await handleFieldChange(
                  "lastYearWorked",
                  event.target.value,
                  true
                );
                // document.querySelector(".nextButton").click();
                sessionStorage.setItem("selectedOption3", "NA");
              }}
              value="NA"
            >
              Select an option below
            </option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019_or_before">2019 Or Before</option>
          </select>
        </div> */}

        <ButtonGroup className="buttonGroupDefault buttonGroupDefaultCustomTablet marginTop ageRangeGroup">
          <Button
            className="strapButtonText strapButtonTextMobileCustom"
            id="button1"
            name="lastYearWorkedYes"
            value="2025"
            onClick={async (event) => {
              await handleFieldChange(
                "lastYearWorked",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption3", "2025");
            }}
            style={
              selectedOption === "2025"
                ? activeButtonStyle
                : normalButtonStyle
            }
          >
            2025
          </Button>
          <Button
            className="strapButtonText strapButtonTextMobileCustom"
            id="button2"
            name="lastYearWorkedNo"
            value="2024"
            onClick={async (event) => {
              await handleFieldChange(
                "lastYearWorked",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption3", "2024");
            }}
            style={
              selectedOption === "2024"
                ? activeButtonStyle
                : normalButtonStyle
            }
          >
            2024
          </Button>
          <Button
            className="strapButtonText strapButtonTextMobileCustom"
            id="button3"
            name="lastYearWorkedNo"
            value="2023"
            onClick={async (event) => {
              await handleFieldChange(
                "lastYearWorked",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption3", "2023");
            }}
            style={
              selectedOption === "2023"
                ? activeButtonStyle
                : normalButtonStyle
            }
          >
            2023
          </Button>
          <Button
            className="strapButtonText strapButtonTextMobileCustom"
            id="button4"
            name="lastYearWorkedNo"
            value="2022"
            onClick={async (event) => {
              await handleFieldChange(
                "lastYearWorked",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption3", "2022");
            }}
            style={
              selectedOption === "2022"
                ? activeButtonStyle
                : normalButtonStyle
            }
          >
            2022
          </Button>
          <Button
            className="strapButtonText strapButtonTextMobileCustom"
            id="button5"
            name="lastYearWorkedNo"
            value="2021"
            onClick={async (event) => {
              await handleFieldChange(
                "lastYearWorked",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption3", "2021");
            }}
            style={
              selectedOption === "2021"
                ? activeButtonStyle
                : normalButtonStyle
            }
          >
            2021
          </Button>
          <Button
            className="strapButtonText strapButtonTextMobileCustom"
            id="button6"
            name="lastYearWorkedNo"
            value="2020"
            onClick={async (event) => {
              await handleFieldChange(
                "lastYearWorked",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption3", "2020");
            }}
            style={
              selectedOption === "2020"
                ? activeButtonStyle
                : normalButtonStyle
            }
          >
            2020
          </Button>
          <Button
            className="strapButtonText strapButtonTextMobileCustom"
            id="button7"
            name="lastYearWorkedNo"
            value="2019_or_before"
            onClick={async (event) => {
              await handleFieldChange(
                "lastYearWorked",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem("selectedOption3", "2019_or_before");
            }}
            style={
              selectedOption === "2019_or_before"
                ? activeButtonStyle
                : normalButtonStyle
            }
          >
            2019 Or Before
          </Button>
          {/* <Button
            className="strapButtonText strapButtonTextMobileCustom i-have-never-worked-full-time"
            id="button2"
            name="lastYearWorkedNo"
            value="i_have_never_worked_full_time"
            onClick={async (event) => {
              await handleFieldChange(
                "lastYearWorked",
                event.target.value,
                true
              );
              document.querySelector(".nextButton").click();
              sessionStorage.setItem(
                "selectedOption3",
                "i_have_never_worked_full_time"
              );
            }}
            style={
              selectedOption === "i_have_never_worked_full_time"
                ? activeButtonStyle
                : normalButtonStyle
            }
          >
            I have never worked full time
          </Button> */}
        </ButtonGroup>
        <div className="errorTextContainer">
          <p className="errorText">Please answer the question above</p>
        </div>
      </div>
    </div>
  );
};

export default ThridStep;
