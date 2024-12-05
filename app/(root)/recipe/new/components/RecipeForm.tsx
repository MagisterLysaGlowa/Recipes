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
import { useForm, SubmitHandler } from "react-hook-form";
type Props = {
  userId: number;
};

type FormValues = {
  title: string;
  cookingTime: string;
  mealFor: string;
  description: string;
};

const RecipeForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { userId } = props;
  const [files, setFiles] = useState<File[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log(ingredients);

      const formData = new FormData();
      steps.forEach((item, index) => {
        item.order = index + 1;
        item.id = 0;
      });

      console.log(steps);

      files.forEach((file) => {
        formData.append("files[]", file);
      });

      formData.append("title", data.title);
      formData.append("cookingTime", data.cookingTime);
      formData.append("mealFor", data.mealFor);
      formData.append("description", data.description);
      formData.append("userId", userId.toString());
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("steps", JSON.stringify(steps));

      const res = await fetch("/api/recipe", {
        method: "POST",
        body: formData,
      });
      console.log(data.mealFor);

      const data1 = await res.json();
      console.log(data1.error);

      // if (!res.ok) {
      //   throw new Error("Failed to submit the form");
      // }

      console.log("Recipe submitted successfully!");
    } catch (error) {
      console.log("Error submitting recipe:", error);
    }
  };

  return (
    <form
      className="flex flex-col max-w-[400px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Title Field */}
      <label htmlFor="title">Tytuł przepisu</label>
      <input
        id="title"
        type="text"
        {...register("title", {
          required: "Tytuł jest wymagany",
          maxLength: 100,
        })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      {/* Description Field */}
      <label htmlFor="description">Opis przepisu</label>
      <input
        id="description"
        type="text"
        {...register("description", {
          required: "Opis jest wymagany",
          maxLength: 2000,
        })}
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      {/* Cooking Time Field */}
      <label htmlFor="cookingTime">Czas gotowania</label>
      <input
        id="cookingTime"
        type="text"
        {...register("cookingTime", {
          required: "Czas gotowania jest wymagany",
          maxLength: 400,
        })}
      />
      {errors.cookingTime && (
        <p className="text-red-500">{errors.cookingTime.message}</p>
      )}

      {/* Meal For Field */}
      <label htmlFor="mealFor">Posiłek dnia</label>
      <select
        id="mealFor"
        {...register("mealFor", { required: "Wybierz posiłek dnia" })}
      >
        <option value="Śniadanie">Śniadanie</option>
        <option value="Obiad">Obiad</option>
        <option value="Kolacja">Kolacja</option>
      </select>
      {errors.mealFor && (
        <p className="text-red-500">{errors.mealFor.message}</p>
      )}

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
