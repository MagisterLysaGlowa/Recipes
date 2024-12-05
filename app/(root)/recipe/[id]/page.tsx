"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "../../../../public/images/schabowy.jpg";
import {
  Ingredient,
  IngredientsOnRecipes,
  RecipeImage,
  Step,
} from "@prisma/client";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMaximize,
} from "@fortawesome/free-solid-svg-icons";
import paper from "../../../../public/images/paper.png";

interface RecipeModel {
  id: number;
  title: string;
  cookingTime: string;
  mealFor: string;
  userId: number;
  description: string;
  recipeImages: RecipeImage[];
  steps: SteptDb[];
  ingredients: IngredientDb[];
}

interface IngredientDb {
  recipeId: number;
  ingredientId: number;
  ingredient: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  };
}

interface SteptDb {
  recipeId: number;
  stepId: number;
  step: {
    id: number;
    description: string;
    order: number;
  };
}

interface ImageData {
  original: string;
  thumbnail: string;
}

const renderLeftNav = (
  onClick: React.MouseEventHandler<HTMLElement>,
  disabled: boolean
) => (
  <button
    className={`custom-left-nav ${
      disabled ? "disabled" : ""
    } text-main rounded-l-xl z-10 absolute left-[-10px]`}
    onClick={onClick}
    disabled={disabled}
    style={{
      border: "none",
      width: "80px",
      height: "600px",
      fontSize: "70px",
      cursor: disabled ? "not-allowed" : "pointer",
    }}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>
);

const renderRightNav = (
  onClick: React.MouseEventHandler<HTMLElement>,
  disabled: boolean
) => (
  <button
    className={`custom-right-nav ${
      disabled ? "disabled" : ""
    } text-main z-10 absolute right-[-10px]`}
    onClick={onClick}
    disabled={disabled}
    style={{
      border: "none",
      width: "80px",
      height: "600px",
      fontSize: "70px",
      cursor: disabled ? "not-allowed" : "pointer",
    }}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
);

const renderFullscreenButton = (
  onClick: React.MouseEventHandler<HTMLElement>,
  disabled: boolean
) => (
  <button
    className={`custom-fullscreen-button ${
      disabled ? "disabled" : ""
    } text-main right-0 bottom-0 absolute z-20`}
    onClick={onClick}
    style={{
      border: "none",
      width: "40px",
      height: "40px",
      fontSize: "40px",
    }}
  >
    <FontAwesomeIcon icon={faMaximize} />
  </button>
);

const page = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [data, setData] = useState<RecipeModel>();
  const params = useParams(); // Access route params dynamically
  const id = params?.id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/recipe/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(await res.json());
    };
    fetchData();
  }, []);

  useEffect(() => {
    setImages([]);
    data?.recipeImages.forEach((item) => {
      setImages((prevState) => [
        ...prevState,
        {
          original: `/uploads/${item.imagePath}`,
          thumbnail: `/uploads/${item.imagePath}`,
        },
      ]);
    });
  }, [data]);

  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center mt-10 w-full max-w-[1400px] bg-white rounded-xl shadow-md px-5">
        <div className="mt-20 max-w-[1200px] w-full h-[750px]">
          <ImageGallery
            showPlayButton={false}
            renderFullscreenButton={renderFullscreenButton}
            renderLeftNav={renderLeftNav}
            renderRightNav={renderRightNav}
            items={images}
            additionalClass="custom-gallery"
            renderItem={(item) => (
              <div className="w-full h-full  flex justify-center">
                <img
                  src={item.original}
                  alt={item.original}
                  className="h-[600px] object-contain place-self-center"
                />
              </div>
            )}
          />
        </div>

        <hr className="w-full h-2 bg-main rounded-full" />
        <div className="bg-white p-10 w-full">
          <h1 className="text-gray-700 text-7xl font-bold ">{data?.title}</h1>
          <p className="mt-8 text-gray-800 text-xl max-w-[1000px]">
            {data?.description}
          </p>
          <div className="mt-16">
            <h2 className="text-gray-700 text-3xl font-bold uppercase tracking-wide">
              Składniki
            </h2>
            <ul className=" bg-slate-100 relative rounded-xl max-w-[1000px] mt-5 shadow-sm">
              <hr className="w-[0.1em] absolute left-[70px] top-0 h-full bg-red-500 z-30" />
              <div className="h-[60px] border-blue-200 border-b"></div>
              {data?.ingredients.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="border-blue-200 border-b py-1 relative pl-24"
                  >
                    <span className="font-sour_gummy font-extralight text-2xl">
                      {item.ingredient.name} {item.ingredient.amount}{" "}
                      {item.ingredient.unit != "none" && item.ingredient.unit}
                    </span>
                  </li>
                );
              })}
              <div className="border-blue-200 py-1">
                <span className="text-transparent">hidden</span>
              </div>
            </ul>
          </div>

          <div className="mt-16">
            <h2 className="text-gray-700 text-3xl font-bold tracking-wide uppercase">
              Instrukcja kroków
            </h2>
            <ul className="mt-5">
              {data?.steps
                .sort((a, b) => a.step.order - b.step.order)
                .map((item, index) => {
                  return (
                    <li key={index} className="flex items-center my-4 relative">
                      <span className="w-[35px] h-[35px] justify-center items-center bg-main text-white flex rounded-full text-lg font-extrabold relative z-10">
                        {item.step.order}
                      </span>
                      <span className="ml-3 text-xl h-[35px] pl-10 pr-16 rounded-full absolute font-normal bg-slate-100 text-gray-800 shadow-sm">
                        {item.step.description}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
