"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import { RecipeImage } from "@prisma/client";
import { useSession } from "next-auth/react";

interface RecipeModel {
  id: number;
  title: string;
  cookingTime: string;
  mealFor: string;
  recipeImages: RecipeImage[];
}

const page = () => {
  const session = useSession();
  const [data, setData] = useState<RecipeModel[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const recipes = await fetch(`/api/recipe/${session?.data?.user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(await recipes.json());
    };
    fetchData();
  }, []);
  return (
    <section className="grid grid-cols-3 place-items-center mt-10 gap-10">
      {data.map((item, index) => {
        return (
          <RecipeCard
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
