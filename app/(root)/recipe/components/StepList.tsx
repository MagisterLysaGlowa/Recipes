import { Step } from "@prisma/client";
import { Trash } from "lucide-react";
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
    <div className="my-10">
      <ul>
        {steps.map((item, index) => (
          <li
            className="bg-slate-50 flex px-4 py-2 border-1"
            key={index}
            draggable
            onDragStart={() => (dragStep.current = index)}
            onDragEnter={() => (draggedOverStep.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <span className="mr-3">{index + 1}.</span>
            <span className="w-full">{item.description}</span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="w-[30px] h-[30px] bg-red-400 flex justify-center items-center text-white rounded-lg"
            >
              <Trash width={30} height={20} />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex mt-5">
        <input
          type="text"
          ref={stepInput}
          placeholder="step"
          className="w-full h-14 shadow-sm rounded-l-md pl-2 outline-none text-lg text-gray-500"
        />
        <button
          type="button"
          className="h-14 bg-main rounded-r-md text-white font-bold font-roboto text-xl w-[62px]"
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
          +
        </button>
      </div>
    </div>
  );
};

export default StepList;
