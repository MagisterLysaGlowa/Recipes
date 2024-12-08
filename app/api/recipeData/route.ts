import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const mealTime = await prisma.mealTime.findMany();
  const occasion = await prisma.occasion.findMany();
  const cuisineType = await prisma.cuisineType.findMany();
  const dishType = await prisma.dishType.findMany();
  const dietaryPreference = await prisma.dietaryPreference.findMany();
  const servingStyle = await prisma.servingStyle.findMany();

  return NextResponse.json({
    mealTime: mealTime,
    occasion: occasion,
    cuisineType: cuisineType,
    dishType: dishType,
    dietaryPreference: dietaryPreference,
    servingStyle: servingStyle,
  });
}
