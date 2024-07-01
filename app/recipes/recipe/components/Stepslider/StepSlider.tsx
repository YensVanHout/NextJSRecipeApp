import { useState } from "react";

function NextButton() {
  return <div>{">"}</div>;
}
function BackButton() {
  return <div>{"<"}</div>;
}
function StepTracker(steps: number, currentStep: number) {
  return (
    <div>
      {currentStep}/{steps}
    </div>
  );
}

export default function StepSlider(steps: string[]) {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => {
    steps.length > currentStep + 1 ? setCurrentStep(currentStep + 1) : null;
  };

  const goBack = () => {
    currentStep > 0 ? setCurrentStep(currentStep - 1) : null;
  };

  return <div>S</div>;
}
