import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const recipe = await prisma.recipe.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      recipeImages: true,
      steps: {
        include: { step: true },
      },
      ingredients: {
        include: { ingredient: true },
      },
    },
  });
  return NextResponse.json(recipe);
}
