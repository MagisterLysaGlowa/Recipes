"use client";
import { Ingredient, Step } from "@prisma/client";
import React, { ChangeEvent, useRef, useState } from "react";
import RecipeForm from "../../components/RecipeForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { useParams } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const session = useSession();
  const params = useParams(); // Access route params dynamically
  const id = params?.id;

  return (
    <section className="w-full flex flex-col items-center">
      <RecipeForm
        userId={session?.data?.user.id}
        mode="edit"
        editId={Number(id)}
      />
    </section>
  );
};

export default page;
