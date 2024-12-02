import { prisma } from "@/app/lib/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface RegisterModel {
  email: string;
  password: string;
  name: string;
  role: string;
}
export async function POST(request: NextRequest) {
  const { email, password, name, role }: RegisterModel = await request.json();
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: await hash(password, 5),
      name: name,
      role: role,
    },
  });
  return NextResponse.json(newUser);
}
