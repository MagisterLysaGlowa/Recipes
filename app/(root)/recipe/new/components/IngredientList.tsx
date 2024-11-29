"use client";
import { Ingredient } from "@prisma/client";
import React, { useRef, useState } from "react";

type Props = {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
};

const IngredientList = (props: Props) => {
  const ingredientInput = useRef<HTMLInputElement>(null);
  const { ingredients, setIngredients } = props;
  return (
    <div>
      <ul>
        {ingredients.map((item, index) => {
          return <li key={index}>{item.name}</li>;
        })}
      </ul>
      <input type="text" ref={ingredientInput} />
      <button
        type="button"
        onClick={() => {
          if (
            !ingredients.some(
              (ingredient) => ingredient.name == ingredientInput.current?.value
            )
          )
            setIngredients([
              ...ingredients,
              {
                name: ingredientInput.current?.value || "",
                amount: 0.5,
                id: 0,
              },
            ]);
        }}
      >
        Dodaj składnik
      </button>
    </div>
  );
};

export default IngredientList;
