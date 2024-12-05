import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { RecipeRequestData } from "@/types";
import { generateRandomString, getFileExtension } from "@/app/utils/utils";
import { Ingredient, Step } from "@prisma/client";

export async function GET() {
  const recipes = await prisma.recipe.findMany({
    include: {
      recipeImages: true,
    },
  });
  return NextResponse.json(recipes);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  //! SET RECIPE VARIABLES FROM FORM DATA
  const title = formData.get("title") as string;
  const cookingTime = formData.get("cookingTime") as string;
  const mealFor = formData.get("mealFor") as string;
  const description = formData.get("description") as string;
  const userId = Number(formData.get("userId") as string);
  const ingredients: Ingredient[] = JSON.parse(
    formData.get("ingredients") as string
  );
  const steps: Step[] = JSON.parse(formData.get("steps") as string);
  const files: File[] | null = formData.getAll("files[]") as unknown as File[];

  if (!files) {
    return NextResponse.json({ success: false });
  }
  const uploadedFileNames: string[] = [];
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadedFileName = `${generateRandomString(20)}.${getFileExtension(
      file.name
    )}`;

    const path = `./public/uploads/recipe/${uploadedFileName}`;
    await writeFile(path, buffer);
    uploadedFileNames.push(uploadedFileName);
  }

  try {
    if (
      !title ||
      !cookingTime ||
      !mealFor ||
      !ingredients ||
      !steps ||
      !description
    ) {
      return NextResponse.json(
        {
          message:
            "All fields (title, cookingTime, mealFor, ingredients, steps) are required.",
        },
        { status: 400 }
      );
    }

    //!CREATE INGREDIENTS USING (MANY TO MANY)

    const ingredients_db = ingredients.map((ingredient) => ({
      ingredient: {
        create: {
          name: ingredient.name, // Matches `name` in Ingredient model
          amount: parseFloat(ingredient.amount.toString()), // Matches `amount` in Ingredient model
          unit: ingredient.unit, // Matches `unit` in Ingredient model
        },
      },
    }));

    //!CREATE STEPS USING (MANY TO MANY)

    const steps_db = steps.map((step) => {
      return {
        step: {
          create: {
            description: step.description,
            order: step.order,
          },
        },
      };
    });

    //*CREATE RECIPE IMAGES USING (ONE TO MANY)

    const images_db = uploadedFileNames.map((image) => ({
      imagePath: `/recipe/${image}`, // Use the actual file name or path
    }));

    //? PUSH RECIPE TO DATABASE

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        cookingTime,
        mealFor,
        description,
        userId: userId,
        ingredients: {
          create: ingredients_db,
        },
        steps: {
          create: steps_db,
        },
        recipeImages: {
          create: images_db,
        },
      },
    });
    return NextResponse.json({
      message: "Recipe created successfully!",
      recipe: newRecipe,
    });
  } catch (error) {
    console.log("Esaaaaa");

    return NextResponse.json(
      {
        message: "Failed to create recipe. Please try again later.",
        error: error,
      },
      { status: 500 }
    );
  }
}
