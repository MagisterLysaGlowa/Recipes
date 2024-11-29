import { Step } from "@prisma/client";
import React, { useRef } from "react";

type Props = {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
};

const StepList = (props: Props) => {
  const stepInput = useRef<HTMLInputElement>(null);
  const { steps, setSteps } = props;
  return (
    <div>
      <ul>
        {steps.map((item, index) => {
          return <li key={index}>{item.description}</li>;
        })}
      </ul>
      <input type="text" ref={stepInput} />
      <button
        type="button"
        onClick={() => {
          if (
            !steps.some((step) => step.description == stepInput.current?.value)
          ) {
            setSteps([
              ...steps,
              { description: stepInput.current?.value || "", id: 1, order: 1 },
            ]);
          }
        }}
      >
        Dodaj krok
      </button>
    </div>
  );
};

export default StepList;
