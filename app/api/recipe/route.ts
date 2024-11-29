import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { RecipeRequestData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate incoming data
    const body = await request.json();
    const {
      title,
      cookingTime,
      mealFor,
      ingredients,
      steps,
    }: RecipeRequestData = body;
    console.log(body);

    if (!title || !cookingTime || !mealFor || !ingredients || !steps) {
      return NextResponse.json(
        {
          message:
            "All fields (title, cookingTime, mealFor, ingredients, steps) are required.",
        },
        { status: 400 }
      );
    }

    const ingredients_db = ingredients.map((ingredient) => {
      return {
        ingredient: {
          create: {
            name: ingredient.name,
            amount: parseFloat(ingredient.amount.toString()),
          },
        },
      };
    });

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

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        cookingTime,
        mealFor,
        ingredients: {
          create: ingredients_db,
        },
        steps: {
          create: steps_db,
        },
      },
    });

    return NextResponse.json({
      message: "Recipe created successfully!",
      recipe: newRecipe,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create recipe. Please try again later.",
        error: error,
      },
      { status: 500 }
    );
  }
}
