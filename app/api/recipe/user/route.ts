import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Extract the `id` query parameter from the request URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Get the `id` value from the query

  if (!id) {
    return NextResponse.json(
      { error: "Missing 'id' query parameter" },
      { status: 400 }
    );
  }

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        userId: parseInt(id), // Parse string to number
      },
      include: {
        recipeImages: true,
      },
    });
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
