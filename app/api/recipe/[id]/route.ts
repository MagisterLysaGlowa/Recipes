import { prisma } from "@/app/lib/db";
import { generateRandomString, getFileExtension } from "@/app/utils/utils";
import { Ingredient, Step } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const recipe = await prisma.recipe.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      recipeImages: true,
      steps: {
        include: { step: true },
      },
      ingredients: {
        include: { ingredient: true },
      },
      MealTime: true,
      Occasion: true,
      CuisineType: true,
      DishType: true,
      DietaryPreference: true,
      ServingStyle: true,
    },
  });
  console.log(recipe);

  return NextResponse.json(recipe);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const cookingTime = formData.get("cookingTime") as string;
  const mealFor = formData.get("mealFor") as string;
  const description = formData.get("description") as string;
  const mealTimeId = Number(formData.get("mealTime") as string);
  const occasionId = Number(formData.get("occasion") as string);
  const cuisineTypeId = Number(formData.get("cuisineType") as string);
  const dishTypeId = Number(formData.get("dishType") as string);
  const dietaryPreferenceId = Number(
    formData.get("dietaryPreference") as string
  );
  const servingStyleId = Number(formData.get("servingStyle") as string);

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

  const images_db = uploadedFileNames.map((image) => ({
    imagePath: `/recipe/${image}`, // Use the actual file name or path
  }));

  await prisma.ingredientsOnRecipes.deleteMany({
    where: {
      recipeId: Number(id),
    },
  });

  await prisma.stepsOnRecipes.deleteMany({
    where: {
      recipeId: Number(id),
    },
  });

  await prisma.recipeImage.deleteMany({
    where: {
      recipeId: Number(id),
    },
  });

  const recipe = await prisma.recipe.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      cookingTime: cookingTime,
      mealFor: mealFor,
      description: description,
      mealTimeId: mealTimeId,
      occasionId: occasionId,
      cuisineTypeId: cuisineTypeId,
      dishTypeId: dishTypeId,
      dietaryPreferenceId: dietaryPreferenceId,
      servingStyleId: servingStyleId,
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
  console.log(recipe);

  return NextResponse.json(recipe);
}
