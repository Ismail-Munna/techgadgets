import { NextResponse } from "next/server";
import { addProduct, products } from "@/lib/data";

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Provide a default image if none is provided
    const productData = {
      ...body,
      imageUrl: body.imageUrl || `https://picsum.photos/seed/${Math.random()}/600/400`,
    };

    const newProduct = addProduct(productData);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
