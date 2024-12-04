import { Step } from "@prisma/client";
import React, { useRef } from "react";

type Props = {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
};

const StepList = (props: Props) => {
  const stepInput = useRef<HTMLInputElement>(null);
  const { steps, setSteps } = props;

  const dragStep = useRef<number>(0);
  const draggedOverStep = useRef<number>(0);

  function handleSort() {
    const stepClone = [...steps];
    const temp = stepClone[dragStep.current];
    stepClone[dragStep.current] = stepClone[draggedOverStep.current];
    stepClone[draggedOverStep.current] = temp;
    setSteps(stepClone);
  }

  return (
    <div>
      <ul>
        {steps.map((item, index) => {
          return (
            <li
              key={index}
              draggable
              onDragStart={() => (dragStep.current = index)}
              onDragEnter={() => (draggedOverStep.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <span>{index + 1}</span>
              <span>{item.description}</span>
            </li>
          );
        })}
      </ul>
      <input type="text" ref={stepInput} />
      <button
        type="button"
        onClick={() => {
          setSteps([
            ...steps,
            { description: stepInput.current?.value || "", id: 0, order: 0 },
          ]);
        }}
      >
        Dodaj krok
      </button>
    </div>
  );
};

export default StepList;
