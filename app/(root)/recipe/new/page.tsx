"use client";
import { Ingredient, Step } from "@prisma/client";
import React, { ChangeEvent, useRef, useState } from "react";
import RecipeForm from "./components/RecipeForm";

type Props = {};

const page = (props: Props) => {
  return (
    <section>
      <h2>Add New Recipe</h2>
      <RecipeForm />
    </section>
  );
};

export default page;
