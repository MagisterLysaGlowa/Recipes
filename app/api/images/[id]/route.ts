import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log("HERE");

  const images = await prisma.recipeImage.findMany({
    where: {
      recipeId: Number(id),
    },
  });
  console.log("HERE");
  console.log(images);

  const imagesDirectory = path.join(process.cwd(), "public", "uploads");
  const files = [];

  for (const imageName of images) {
    const imagePath = path.join(imagesDirectory, imageName.imagePath);

    if (!fs.existsSync(imagePath)) {
      return NextResponse.json("Image not found");
    }

    const fileBuffer = fs.readFileSync(imagePath);
    const fileType = path.extname(imagePath).slice(1); // Get file extension

    files.push({
      name: imageName,
      type: `image/${fileType}`,
      content: fileBuffer.toString("base64"), // Base64 encode the file
    });
  }

  return NextResponse.json({ files });
}
