"use client";
import {
  CuisineType,
  DietaryPreference,
  DishType,
  Ingredient,
  MealTime,
  Occasion,
  ServingStyle,
  Step,
} from "@prisma/client";
import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import IngredientList from "./IngredientList";
import StepList from "./StepList";
import { title } from "process";
import ImageUpload from "./ImageUpload";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
type Props = {
  userId: number;
  mode: string;
  editId: number | undefined;
};

type FormValues = {
  title: string;
  cookingTime: string;
  mealFor: string;
  description: string;
  mealTime: string;
  occasion: string;
  cuisineType: string;
  dishType: string;
  dietaryPreference: string;
  servingStyle: string;
};

interface RecipeData {
  mealTime: MealTime[];
  occasion: Occasion[];
  cuisineType: CuisineType[];
  dishType: DishType[];
  dietaryPreference: DietaryPreference[];
  servingStyle: ServingStyle[];
}

interface SelectEditValue {
  mealTimeId: number;
  occasionId: number;
  cuisineTypeId: number;
  dishTypeId: number;
  dietaryPreferenceId: number;
  servingStyleId: number;
}

const RecipeForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const { userId, mode, editId } = props;
  const [files, setFiles] = useState<File[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [recipeData, setRecipeData] = useState<RecipeData>();
  const [selectEdit, setSelectEdit] = useState<SelectEditValue>({
    mealTimeId: 0,
    occasionId: 0,
    cuisineTypeId: 0,
    dishTypeId: 0,
    dietaryPreferenceId: 0,
    servingStyleId: 0,
  });

  const mealTimeInput = useRef(null);

  //! SET SELECTS DATA WITH DATA FROM DB
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/recipeData", {
        method: "GET",
      });
      setRecipeData(await res.json());
    };
    fetchData();

    if (mode == "edit" && editId) {
      const fetchEditData = async () => {
        const res = await fetch(`/api/recipe/${editId}`, {
          method: "GET",
        });
        const data = await res.json();
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("cookingTime", data.cookingTime);
        setValue("mealTime", data.mealTimeId);
        setValue("occasion", data.occasionId);
        setValue("cuisineType", data.cuisineTypeId);
        setValue("dishType", data.dishTypeId);
        setValue("dietaryPreference", data.dietaryPreferenceId);
        setValue("servingStyle", data.servingStyleId);
        setSelectEdit({
          mealTimeId: data.mealTimeId,
          occasionId: data.occasionId,
          cuisineTypeId: data.cuisineTypeId,
          dishTypeId: data.dishTypeId,
          dietaryPreferenceId: data.dietaryPreferenceId,
          servingStyleId: data.servingStyleId,
        });

        //!SET INGREDIENTS FROM DB
        setIngredients(() => {
          const array: Ingredient[] = [];
          data.ingredients.forEach((item: any) => {
            array.push(item.ingredient);
          });
          return array;
        });

        //!SET STEPS FROM DB
        setSteps(() => {
          const array: Step[] = [];
          data.steps.forEach((item: any) => {
            array.push(item.step);
          });
          return array;
        });

        const images = await fetch(`/api/images/${editId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { files } = await images.json();

        // Convert server response to File objects
        const fileArray = files.map(
          (file: any) =>
            new File(
              [Uint8Array.from(atob(file.content), (c) => c.charCodeAt(0))],
              file.name.imagePath,
              { type: file.type }
            )
        );
        setFiles(fileArray);
      };
      fetchEditData();
    }
  }, []);

  const onSubmitNew: SubmitHandler<FormValues> = async (data) => {
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

      formData.append("mealTime", data.mealTime);
      formData.append("occasion", data.occasion);
      formData.append("cuisineType", data.cuisineType);
      formData.append("dishType", data.dishType);
      formData.append("dietaryPreference", data.dietaryPreference);
      formData.append("servingStyle", data.servingStyle);

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
    router.push("/recipe");
  };

  const onSubmitEdit: SubmitHandler<FormValues> = async (data) => {
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

      formData.append("mealTime", data.mealTime);
      formData.append("occasion", data.occasion);
      formData.append("cuisineType", data.cuisineType);
      formData.append("dishType", data.dishType);
      formData.append("dietaryPreference", data.dietaryPreference);
      formData.append("servingStyle", data.servingStyle);

      formData.append("description", data.description);
      formData.append("userId", userId.toString());
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("steps", JSON.stringify(steps));

      const res = await fetch(`/api/recipe/${editId}`, {
        method: "PUT",
        body: formData,
      });

      const data1 = await res.json();
      console.log("Recipe updated successfully!");
    } catch (error) {
      console.log("Error submitting recipe:", error);
    }
    router.push("/recipe");
  };

  return (
    <form
      className="flex flex-col max-w-[800px] w-full"
      onSubmit={handleSubmit(mode == "new" ? onSubmitNew : onSubmitEdit)}
    >
      {/* Title Field */}
      <label
        htmlFor="title"
        className="text-main uppercase font-bold text-xl mb-1 font-roboto"
      >
        Tytuł przepisu
      </label>
      <input
        id="title"
        className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500"
        type="text"
        {...register("title", {
          required: "Tytuł jest wymagany",
          maxLength: 100,
        })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      {/*Description Field */}
      <label
        htmlFor="description"
        className="text-main uppercase font-bold text-xl mb-1 mt-5 font-roboto"
      >
        Opis przepisu
      </label>
      <input
        id="description"
        className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500"
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
      <label
        htmlFor="cookingTime"
        className="text-main uppercase font-bold text-xl mb-1 mt-5 font-roboto"
      >
        Czas gotowania
      </label>
      <input
        className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500"
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
      <label
        htmlFor="mealFor"
        className="text-main uppercase font-bold text-xl mb-1 font-roboto"
      >
        Posiłek dnia
      </label>
      <select
        className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500"
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

      <div className="w-full grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          {/* Meal Time*/}
          <label
            htmlFor="mealTime"
            className="text-main uppercase font-bold text-xl mb-1 font-roboto mt-5"
          >
            Pora dnia
          </label>
          <select
            className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500  bg-white"
            id="mealTime"
            value={selectEdit.mealTimeId}
            {...register("mealTime", {
              required: "Wybierz porę dnia",
              onChange: (e) => {
                const { value } = e.target;
                setSelectEdit({
                  ...selectEdit,
                  mealTimeId: Number(value),
                });
              },
            })}
          >
            {recipeData?.mealTime.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.time}
                </option>
              );
            })}
          </select>
          {errors.mealTime && (
            <p className="text-red-500">{errors.mealTime.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          {/*Occasion*/}
          <label
            htmlFor="occasion"
            className="text-main uppercase font-bold text-xl mb-1 font-roboto mt-5"
          >
            Okazja
          </label>
          <select
            className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500 bg-white"
            value={selectEdit.occasionId}
            id="occasion"
            {...register("occasion", {
              required: "Wybierz okazję",
              onChange: (e) => {
                const { value } = e.target;
                setSelectEdit({
                  ...selectEdit,
                  occasionId: Number(value),
                });
              },
            })}
          >
            {recipeData?.occasion.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors.occasion && (
            <p className="text-red-500">{errors.occasion.message}</p>
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          {/*CUISINE TYPE*/}
          <label
            htmlFor="cuisineType"
            className="text-main uppercase font-bold text-xl mb-1 font-roboto mt-5"
          >
            Rodzaj kuchni
          </label>
          <select
            className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500 bg-white"
            value={selectEdit.cuisineTypeId}
            id="cuisineType"
            {...register("cuisineType", {
              required: "Wybierz rodzaj kuchni",
              onChange: (e) => {
                const { value } = e.target;
                setSelectEdit({
                  ...selectEdit,
                  cuisineTypeId: Number(value),
                });
              },
            })}
          >
            {recipeData?.cuisineType.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors.cuisineType && (
            <p className="text-red-500">{errors.cuisineType.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          {/*DISH TYPE*/}
          <label
            htmlFor="dishType"
            className="text-main uppercase font-bold text-xl mb-1 font-roboto mt-5"
          >
            Rodzaj dania
          </label>
          <select
            className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500 bg-white"
            value={selectEdit.dishTypeId}
            id="dishType"
            {...register("dishType", {
              required: "Wybierz rodzaj dania",
              onChange: (e) => {
                const { value } = e.target;
                setSelectEdit({
                  ...selectEdit,
                  dishTypeId: Number(value),
                });
              },
            })}
          >
            {recipeData?.dishType.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors.dishType && (
            <p className="text-red-500">{errors.dishType.message}</p>
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          {/*DIETARY PREFERENCES*/}
          <label
            htmlFor="dietaryPreference"
            className="text-main uppercase font-bold text-xl mb-1 font-roboto mt-5"
          >
            Preferencje Dietetyczne
          </label>
          <select
            className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500 bg-white"
            value={selectEdit.dietaryPreferenceId}
            id="dietaryPreference"
            {...register("dietaryPreference", {
              required: "Wybierz preferencje dietetyczne",
              onChange: (e) => {
                const { value } = e.target;
                setSelectEdit({
                  ...selectEdit,
                  dietaryPreferenceId: Number(value),
                });
              },
            })}
          >
            {recipeData?.dietaryPreference.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors.dietaryPreference && (
            <p className="text-red-500">{errors.dietaryPreference.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          {/*SERVING STYLE*/}
          <label
            htmlFor="servingStyle"
            className="text-main uppercase font-bold text-xl mb-1 font-roboto mt-5"
          >
            Sposób Podania
          </label>
          <select
            className="shadow-sm rounded-lg h-14 border outline-none text-lg pl-2 text-gray-500 bg-white"
            value={selectEdit.servingStyleId}
            id="servingStyle"
            {...register("servingStyle", {
              required: "Wybierz sposób podania",
              onChange: (e) => {
                const { name, value } = e.target;
                setSelectEdit({
                  ...selectEdit,
                  servingStyleId: Number(value),
                });
              },
            })}
          >
            {recipeData?.servingStyle.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors.servingStyle && (
            <p className="text-red-500">{errors.servingStyle.message}</p>
          )}
        </div>
      </div>

      <IngredientList
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <StepList steps={steps} setSteps={setSteps} />
      <ImageUpload files={files} setFiles={setFiles} />
      <div className="w-full mt-5 flex justify-center">
        <button className="w-full max-w-[200px] text-white font-bold bg-main rounded-lg h-12">
          Confirm data
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
