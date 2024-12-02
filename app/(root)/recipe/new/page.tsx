import { Ingredient, Step } from "@prisma/client";
import React, { ChangeEvent, useRef, useState } from "react";
import RecipeForm from "./components/RecipeForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <h2>Add New Recipe</h2>
      <RecipeForm userId={session?.user.id} />
    </section>
  );
};

export default page;
