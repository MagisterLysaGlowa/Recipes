"use client";

import { Recipe, RecipeImage } from "@prisma/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

interface RecipeModel {
  id: number;
  title: string;
  cookingTime: string;
  mealFor: string;
  recipeImages: RecipeImage[];
}

const page = () => {
  const [data, setData] = useState<RecipeModel[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  useEffect(() => {
    const fetchData = async () => {
      console.log(search);
      if (search) {
        const res = await fetch(`/api/recipe/title/${search}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(await res.json());
      } else {
        const res = await fetch(`/api/recipe`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(await res.json());
      }
    };
    fetchData();
  }, []);

  return (
    <section className="grid grid-cols-3 place-items-center mt-10 gap-10">
      {data.map((item, index) => {
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
  );
};

export default page;
