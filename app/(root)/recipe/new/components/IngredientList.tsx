"use client";
import { Ingredient } from "@prisma/client";
import React, { ChangeEvent, useRef, useState } from "react";

type Props = {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
};

interface IngredientFormData {
  name: string;
  amount: number;
  unit: string;
}

const IngredientList = (props: Props) => {
  const [formData, setFormData] = useState<IngredientFormData>({
    name: "",
    amount: 0,
    unit: "none",
  });
  const { ingredients, setIngredients } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <ul>
        {ingredients.map((item, index) => {
          return (
            <li key={index} tabIndex={index}>
              {item.name} {item.amount} -{item.unit}
              <button
                type="button"
                onClick={() => {
                  setIngredients((prevState) =>
                    prevState.filter(
                      (ingredient) => ingredient.name !== item.name
                    )
                  );
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        name="name"
        placeholder="ingredient"
        onChange={handleChange}
        value={formData.name}
      />
      <input
        type="text"
        name="amount"
        placeholder="ammount"
        onChange={handleChange}
        value={formData.amount}
      />
      <select name="unit" onChange={handleSelectChanged} value={formData.unit}>
        <option>none</option>
        <option>kg</option>
        <option>g</option>
      </select>

      <button
        type="button"
        onClick={() => {
          if (
            !ingredients.some((ingredient) => ingredient.name == formData.name)
          )
            setIngredients([
              ...ingredients,
              {
                name: formData.name,
                amount: Number(formData.amount),
                unit: formData.unit,
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
