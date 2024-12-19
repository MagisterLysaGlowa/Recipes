import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const ingredients = searchParams.getAll("ingredients"); // Pobierz wszystkie wartości parametru `ingredients`

  if (!ingredients || ingredients.length === 0) {
    return NextResponse.json(
      {
        error:
          "Invalid ingredients parameter. It must include at least one ingredient name.",
      },
      { status: 400 }
    );
  }

  try {
    // Znajdź wszystkie przepisy, które zawierają **wszystkie podane składniki**
    const recipes = await prisma.recipe.findMany({
      where: {
        AND: ingredients.map((ingredientName) => ({
          ingredients: {
            some: {
              ingredient: {
                name: ingredientName, // Dopasowanie po nazwie składnika
              },
            },
          },
        })),
      },
      include: {
        ingredients: {
          include: {
            ingredient: true, // Pobierz szczegóły składników
          },
        },
        recipeImages: {
          include: {
            recipe: true,
          },
        },
      },
    });

    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
