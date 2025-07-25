import React, { useState, useEffect } from "react";
import Button from "../../assets/components/Button";
import NextArrow from "../../assets/images/next-arrow.png";
import BackArrow from "../../assets/images/back-arrow.png";
import { motion, AnimatePresence } from "framer-motion";

const StepController = ({ steps, manageNextStepValidation, stepsAmount }) => {
  // State component for the step ->
  const [step, setStep] = useState(() => {
    const savedStep = sessionStorage.getItem("currentStep");
    // If there is a step saved in session storage then use that else default to 1
    return savedStep ? parseInt(savedStep, 10) : 1; // default to step 1
  });

  // Custom Progress Bar Component
  function CustomProgressBar({ step, totalSteps }) {
    const progressWidth = (step / totalSteps) * 100;
    return (
      <div className="progress-bar-container" style={{ width: "100%" }}>
        <div
          className="progress-bar"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
    );
  }

  // After button click scroll to top of the page
  const scrollToTop = () => {
    const topElement = document.getElementById("appContainerID");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onNextStep = () => {
    // Update state with step and call the scroll to top function only if validation passes
    if (manageNextStepValidation(step) && step !== stepsAmount) {
      const nextStep = step + 1;
      // This is used for the submit true field in the form.js google sheet function
      sessionStorage.setItem("currentStepCount", nextStep);
      // This is used so if the user refreshes the page they continue where they left off
      sessionStorage.setItem("currentStep", step);
      setStep(nextStep);
      scrollToTop();
      return;
    }
  };
  useEffect(() => {
    // This is only used for tracking the step in state nothing else ->
    // If the tracking currentStepCount isnt set in session storage then set it else it will ignore this
    if (!sessionStorage.getItem("currentStepCount")) {
      sessionStorage.setItem("currentStepCount", step);
    }
    // sessionStorage.setItem("currentStepCount", step ?? 1);
  }, [step]);
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "200px" }}>
      <CustomProgressBar step={step} totalSteps={stepsAmount} />
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "200px",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step} // Unique key for each step to trigger exit and enter animations
            initial={{ opacity: 0, x: 50 }} // Start
            animate={{ opacity: 1, x: 0 }} // Fade in and slide in
            exit={{ opacity: 0, x: -50 }} // Fade out and exit
            transition={{ duration: 0.3 }} // Duration
            style={{ width: "100%" }} // Leave this to ensure the div takes full width
          >
            {steps[step - 1]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ width: "100%" }}>
        <div className="stepControllerArrows">
          <Button
            id="nextButton"
            className="nextButton"
            onClick={() => onNextStep()}
          >
            {step !== stepsAmount ? "Next" : "FREE CONSULTATION"}
            <img alt="Next Arrow" className="nextArrow" src={NextArrow}></img>
          </Button>
          {step !== 1 && (
            <Button
              className="backButton"
              onClick={() => {
                setStep(step - 1);
                scrollToTop();
              }}
            >
              <img alt="Back Arrow" className="backArrow" src={BackArrow}></img>{" "}
              Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepController;
