"use client";
import { Ingredient } from "@prisma/client";
import { Trash } from "lucide-react";
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
    <div className="mt-5">
      <ul>
        {ingredients.map((item, index) => {
          return (
            <li key={index} className="bg-slate-50 flex px-4 py-2 border-1">
              <span className="w-full">
                {item.name} {item.amount} -{item.unit}
              </span>
              <button
                className="w-[30px] h-[30px] bg-red-400 flex justify-center items-center text-white rounded-lg"
                onClick={() => {
                  setIngredients((prevState) =>
                    prevState.filter(
                      (ingredient) => ingredient.name !== item.name
                    )
                  );
                }}
              >
                <Trash width={30} height={20} />
              </button>
            </li>
          );
        })}
      </ul>
      <label className="text-main text-xl uppercase font-bold text-roboto mt-5 mb-10">
        Dodaj składniki
      </label>
      <div className="flex">
        <input
          type="text"
          name="name"
          placeholder="ingredient"
          className="w-full h-14 outline-none rounded-l-md mt-2 pl-2 text-lg text-gray-500 text-thin"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="number"
          name="amount"
          className="h-14 outline-none mt-2 pl-2 text-lg text-gray-500 text-thin w-[150px] text-center border-l"
          placeholder="ammount"
          onChange={handleChange}
          value={formData.amount}
        />
        <select
          name="unit"
          className="h-14 mt-2 px-4 text-center"
          onChange={handleSelectChanged}
          value={formData.unit}
        >
          <option>none</option>
          <option>kg</option>
          <option>g</option>
        </select>
        <button
          type="button"
          className="h-14 bg-main mt-2 rounded-r-md text-white font-bold font-roboto text-xl w-[90px]"
          onClick={() => {
            if (
              !ingredients.some(
                (ingredient) => ingredient.name == formData.name
              )
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
          +
        </button>
      </div>
    </div>
  );
};

export default IngredientList;
