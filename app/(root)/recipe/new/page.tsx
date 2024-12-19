import { Ingredient, Step } from "@prisma/client";
import React, { ChangeEvent, useRef, useState } from "react";
import RecipeForm from "../components/RecipeForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex flex-col items-center">
      <RecipeForm userId={session?.user.id} mode="new" editId={undefined} />
    </section>
  );
};

export default page;
