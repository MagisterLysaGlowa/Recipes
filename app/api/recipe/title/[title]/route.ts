import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { title: string } }
) {
  const recipes = await prisma.recipe.findMany({
    where: {
      title: {
        contains: params.title,
        mode: "insensitive", // Optional: makes the search case-insensitive
      },
    },
    include: {
      recipeImages: true,
    },
  });
  return NextResponse.json(recipes);
}
