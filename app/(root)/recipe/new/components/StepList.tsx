import { Step } from "@prisma/client";
import React, { useRef, useState } from "react";

type Props = {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
};

const StepList = (props: Props) => {
  const [count, setCount] = useState<number>(0);
  const { steps, setSteps } = props;
  const dragStep = useRef<number>(0);
  const draggedOverStep = useRef<number>(0);
  const stepInput = useRef<HTMLInputElement>(null);

  function handleSort() {
    const stepClone = [...steps];
    const temp = stepClone[dragStep.current];
    stepClone[dragStep.current] = stepClone[draggedOverStep.current];
    stepClone[draggedOverStep.current] = temp;
    setSteps(stepClone);
  }

  function handleRemove(index: number) {
    // Remove the step at the given index
    const updatedSteps = steps.filter((_, i) => i !== index);
    // Reorder the remaining steps
    const reorderedSteps = updatedSteps.map((step, idx) => ({
      ...step,
      order: idx,
    }));
    setSteps(reorderedSteps);
  }

  return (
    <div>
      <ul>
        {steps.map((item, index) => (
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
            <button type="button" onClick={() => handleRemove(index)}>
              usuń
            </button>
          </li>
        ))}
      </ul>
      <input type="text" ref={stepInput} />
      <button
        type="button"
        onClick={() => {
          setSteps([
            ...steps,
            {
              description: stepInput.current?.value || "",
              id: count,
              order: steps.length, // Assign the current length as the order
            },
          ]);
          setCount((prev) => prev + 1);
        }}
      >
        Dodaj krok
      </button>
    </div>
  );
};

export default StepList;
