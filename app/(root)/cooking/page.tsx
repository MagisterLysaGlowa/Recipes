"use client";
import { Ingredient } from "@prisma/client";
import React, { FormEvent, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { Search, Trash } from "lucide-react";

const RecipeFilter = () => {
  const [ingredientName, setIngredientName] = useState<string>("");
  const [ingredientNames, setIngredientNames] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/recipe`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRecipes(await res.json());
    };

    fetchData();
  }, []);

  async function getRecipesByIngredientNames(
    ingredientNames: string[]
  ): Promise<any[]> {
    try {
      // Convert the array of ingredient names into a query string
      const query = new URLSearchParams();
      ingredientNames.forEach((name) => query.append("ingredients", name));

      // Use fetch to send a GET request
      const response = await fetch(`/api/cooking?${query.toString()}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching recipes: ${response.statusText}`);
      }

      // Parse and return the response JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  }

  const handleSearch = async () => {
    try {
      const result = await getRecipesByIngredientNames(ingredientNames);
      setRecipes(result);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleIngredientSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (ingredientNames.includes(ingredientName)) return;
    setIngredientNames([...ingredientNames, ingredientName]);
    setIngredientName("");
  };

  return (
    <div>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl uppercase font-bold text-main my-8">
          Find Recipes
        </h1>
        <form
          onSubmit={handleIngredientSubmit}
          className="flex w-full justify-center"
        >
          <input
            type="text"
            value={ingredientName}
            onChange={(e) => {
              const { value } = e.target;
              setIngredientName(value);
            }}
            className="w-full max-w-[450px] h-12 bg-white outline-none rounded-l-xl"
          />
          <button className="bg-main text-white text-4xl font-bold px-6 h-12 rounded-r-xl">
            +
          </button>
        </form>
        <div className="flex w-full justify-center items-end">
          <ul className="w-full max-w-[450px]">
            {ingredientNames.map((item, index) => {
              return (
                <li key={index} className="bg-slate-50 flex px-4 py-2 border-1">
                  <span className="w-full">{item}</span>
                  <button
                    className="w-[30px] h-[30px] bg-red-400 flex justify-center items-center text-white rounded-lg"
                    onClick={() => {
                      const filter = ingredientNames.filter((i) => i !== item);
                      setIngredientNames(filter);
                    }}
                  >
                    <Trash width={30} height={20} />
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            className="bg-main text-white text-4xl font-bold px-6 h-12 rounded-r-xl place-items-end"
            onClick={handleSearch}
          >
            <Search />
          </button>
        </div>
      </div>

      <section className="grid grid-cols-3 place-items-center mt-10 gap-10">
        {recipes.map((item, index) => {
          return (
            <RecipeCard
              route={`/recipe/${item.id}`}
              key={index}
              imageSrc={`/uploads${
                item.recipeImages[0] == undefined
                  ? ""
                  : item.recipeImages[0].imagePath
              }`}
              title={item.title}
              cookingTime={item.cookingTime}
              rating={4.5}
            />
          );
        })}
      </section>
    </div>
  );
};

export default RecipeFilter;
