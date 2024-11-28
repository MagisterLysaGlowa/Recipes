import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
export async function POST(request: NextRequest) {
  const user = await prisma.user.create({
    data: {
      email: "elsa@prisma.io",
      password: await hash("Dol@rek12345", 12),
      name: "Elsa Prisma",
    },
  });
  return NextResponse.json(user);
}
