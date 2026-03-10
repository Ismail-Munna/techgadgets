import { NextResponse } from "next/server";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const productData = {
      ...body,
      imageUrl:
        body.imageUrl ||
        `https://picsum.photos/seed/${Math.random()}/600/400`,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "products"), productData);

    return NextResponse.json(
      {
        id: docRef.id,
        ...productData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST product error:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}