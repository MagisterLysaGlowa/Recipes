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
type Props = {};

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "/uploads/schabowy.jpg",
    thumbnail: "/uploads/schabowy.jpg",
  },
];

interface RecipeModel {
  id: number;
  title: string;
  cookingTime: string;
  mealFor: string;
  userId: number;
  recipeImages: RecipeImage[];
  steps: Step[];
  ingredients: IngredientDb[];
}

interface IngredientDb {
  recipeId: number;
  ingredientId: number;
  ingredient: {
    id: number;
    name: string;
    amount: number;
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
    } text-main hover:bg-main bg-transparent hover:text-white rounded-l-xl transition-all duration-700 z-10 absolute rounded-tl-xl rounded-bl-xl left-[-10px]`}
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
    className={`custom-left-nav ${
      disabled ? "disabled" : ""
    } text-main hover:bg-main bg-main_hover hover:text-white rounded-r-xl transition-all duration-700 z-10 absolute right-[-10px]`}
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
    className={`custom-left-nav ${
      disabled ? "disabled" : ""
    } text-main right-[90px] bottom-0 absolute z-20`}
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
    data?.recipeImages.forEach((item) => {
      setImages((prevState) => [
        ...prevState,
        {
          original: `/uploads/${item.imagePath}`,
          thumbnail: `/uploads/${item.imagePath}`,
        },
      ]);
      console.log(item.imagePath);
    });
  }, [data]);
  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center mt-10 w-full max-w-[1400px]">
        <div className="mt-10 max-w-[1500px] w-full h-[750px]">
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
                  alt=""
                  className="h-[600px] object-contain place-self-center"
                />
              </div>
            )}
          />
        </div>

        <hr className="w-full h-2 bg-main rounded-full" />
        <div className="bg-white p-10 w-full">
          <h1 className="text-gray-700 text-5xl font-bold">{data?.title}</h1>
          <div>
            <h2 className="text-gray-700 text-2xl font-semibold">Składniki</h2>
            <ul>
              {data?.ingredients.map((item, index) => {
                return <li key={index}>{item.ingredient.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
