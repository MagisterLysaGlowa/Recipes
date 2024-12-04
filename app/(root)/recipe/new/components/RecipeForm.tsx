"use client";
import { Ingredient, Step } from "@prisma/client";
import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import IngredientList from "./IngredientList";
import StepList from "./StepList";
import { title } from "process";
import ImageUpload from "./ImageUpload";
type Props = {
  userId: number;
};

const RecipeForm = (props: Props) => {
  const { userId } = props;
  const [files, setFiles] = useState<File[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [title, setTitle] = useState<string>("");
  const [cookingTime, setCookingTime] = useState<string>("");
  const [mealFor, setMealFor] = useState<string>("Śniadanie");
  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    try {
      const data = new FormData();

      steps.forEach((item, index) => {
        item.order = index + 1;
      });

      files.forEach((file) => {
        data.append("files[]", file);
      });
      data.append("title", title);
      data.append("cookingTime", cookingTime);
      data.append("mealFor", mealFor);
      data.append("ingredients", JSON.stringify(ingredients));
      data.append("steps", JSON.stringify(steps));
      data.append("userId", userId.toString());

      const res = await fetch("/api/recipe", {
        method: "POST",
        body: data,
      });
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <form className="flex flex-col max-w-[400px]" onSubmit={handleSubmit}>
      <label>Tytuł przepisu</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <label>Czas gotowania</label>
      <input
        type="text"
        name="title"
        value={cookingTime}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setCookingTime(e.target.value);
        }}
      />
      <label>Posiłek dnia</label>
      <select>
        <option>Śniadanie</option>
        <option>Obiad</option>
        <option>Kolacja</option>
      </select>

      <IngredientList
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <StepList steps={steps} setSteps={setSteps} />
      <ImageUpload files={files} setFiles={setFiles} />
      <button>Dodaj</button>
    </form>
  );
};

export default RecipeForm;
