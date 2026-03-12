import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase-server";

export const FALLBACK_PRODUCT_IMAGE_URL =
  "https://picsum.photos/seed/product-fallback/600/400";

export type ProductRecord = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  priority: string;
  imageUrl: string;
  dateAdded: string;
  createdAt: string;
  name?: string | null;
};

type RawProductData = Partial<Omit<ProductRecord, "id">> & {
  createdAt?: unknown;
  dateAdded?: unknown;
  price?: unknown;
};

type CreateProductInput = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  priority: "High" | "Medium" | "Low";
  imageUrl?: string;
};

function toIsoString(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? null : date.toISOString();
  }

  if (typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? null : date.toISOString();
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    const date = value.toDate();
    return date instanceof Date && !Number.isNaN(date.valueOf())
      ? date.toISOString()
      : null;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "seconds" in value &&
    typeof value.seconds === "number"
  ) {
    return new Date(value.seconds * 1000).toISOString();
  }

  return null;
}

function toNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function normalizeText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeProduct(id: string, data: RawProductData): ProductRecord {
  const dateAdded =
    toIsoString(data.dateAdded) ??
    toIsoString(data.createdAt) ??
    new Date().toISOString();

  return {
    id,
    title: normalizeText(data.title, normalizeText(data.name, "Untitled product")),
    shortDescription: normalizeText(data.shortDescription),
    fullDescription: normalizeText(data.fullDescription),
    price: toNumber(data.price),
    priority: normalizeText(data.priority, "Medium"),
    imageUrl: normalizeText(data.imageUrl, FALLBACK_PRODUCT_IMAGE_URL),
    dateAdded,
    createdAt: toIsoString(data.createdAt) ?? dateAdded,
    name: normalizeText(data.name) || null,
  };
}

function sortNewestFirst(products: ProductRecord[]) {
  return [...products].sort((left, right) => {
    return (
      new Date(right.dateAdded).valueOf() - new Date(left.dateAdded).valueOf()
    );
  });
}

export async function listProductsFromStore() {
  const snapshot = await getDocs(query(collection(db, "products")));
  const products = snapshot.docs.map((productDoc) =>
    normalizeProduct(productDoc.id, productDoc.data() as RawProductData)
  );

  return sortNewestFirst(products);
}

export async function getProductFromStore(id: string) {
  const snapshot = await getDoc(doc(db, "products", id));

  if (!snapshot.exists()) {
    return null;
  }

  return normalizeProduct(snapshot.id, snapshot.data() as RawProductData);
}

export async function createProductInStore(input: CreateProductInput) {
  const dateAdded = new Date().toISOString();
  const imageUrl = normalizeText(
    input.imageUrl,
    `https://picsum.photos/seed/${Date.now()}/600/400`
  );

  const productData = {
    title: normalizeText(input.title),
    shortDescription: normalizeText(input.shortDescription),
    fullDescription: normalizeText(input.fullDescription),
    price: toNumber(input.price),
    priority: normalizeText(input.priority, "Medium"),
    imageUrl,
    dateAdded,
    createdAt: serverTimestamp(),
  };

  const documentRef = await addDoc(collection(db, "products"), productData);

  return normalizeProduct(documentRef.id, {
    ...productData,
    createdAt: new Date().toISOString(),
  });
}

export async function deleteProductFromStore(id: string) {
  await deleteDoc(doc(db, "products", id));
}
