import { Ingredient, Step } from "@prisma/client";

interface RecipeRequestData {
  title: string;
  cookingTime: string;
  mealFor: string;
  ingredients: Ingredient[];
  steps: Step[];
}
