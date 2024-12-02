import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        userId: params.id,
      },
      include: {
        recipeImages: true,
      },
    });
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json(error);
  }
}
