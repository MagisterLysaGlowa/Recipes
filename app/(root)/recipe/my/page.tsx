"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import { RecipeImage } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RecipeModel {
  id: number;
  title: string;
  cookingTime: string;
  mealFor: string;
  recipeImages: RecipeImage[];
}

const page = () => {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState<RecipeModel[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log(session?.data?.user.id);

      if (!session?.data?.user.id) {
        router.push("/auth/login");
        return;
      }
      const recipes = await fetch(
        `/api/recipe/user?id=${session?.data?.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(await recipes.json());
    };
    fetchData();
  }, []);
  return (
    <section className="grid grid-cols-3 place-items-center mt-10 gap-10">
      {data.map((item, index) => {
        return (
          <div className="w-full flex items-center flex-col" key={index}>
            <RecipeCard
              route="recipe"
              imageSrc={`/uploads${
                item.recipeImages[0] == undefined
                  ? ""
                  : item.recipeImages[0].imagePath
              }`}
              title={item.title}
              cookingTime={item.cookingTime}
              rating={4.5}
            />
            <div className="mt-5 flex gap-10">
              <Link
                className="w-[150px] h-10 bg-yellow-400 text-white font-bold text-xl rounded-lg flex items-center justify-center"
                href={`/recipe/edit/${item.id}`}
              >
                Edytuj
              </Link>
              <button className="w-[150px] h-10 bg-red-400 text-white font-bold text-xl rounded-lg">
                Usuń
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default page;
