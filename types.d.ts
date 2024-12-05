import { Ingredient, Step } from "@prisma/client";

interface RecipeRequestData {
  title: string;
  cookingTime: string;
  mealFor: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
}
