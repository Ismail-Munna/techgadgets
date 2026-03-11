import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { getProductById as getLocalProductById } from "@/lib/data";
import {
  FALLBACK_PRODUCT_IMAGE_URL,
  getProductFromStore,
} from "@/lib/product-store";

export const dynamic = 'force-dynamic';
const NEXT_IMAGE_HOSTS = new Set(["picsum.photos"]);

async function getProduct(id: string) {
  return (await getProductFromStore(id)) ?? getLocalProductById(id);
}

function canUseNextImage(src: string) {
  if (src.startsWith("/")) {
    return true;
  }

  try {
    const url = new URL(src);
    return url.protocol === "https:" && NEXT_IMAGE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | TechGadgets`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const imageSrc = product.imageUrl || FALLBACK_PRODUCT_IMAGE_URL;
  const useNextImage = canUseNextImage(imageSrc);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Product Image */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 relative">
              {useNextImage ? (
                <Image
                  src={imageSrc}
                  alt={product.title}
                  fill
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imageSrc}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.title}</h1>

            <div className="mt-3 flex items-center justify-between">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
              <div className="flex items-center">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="ml-2 text-sm text-gray-500">124 reviews</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: product.fullDescription.replace(/\n/g, '<br/>') }} />
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Priority Level</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                  {product.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Date Added</span>
                <span className="text-sm text-gray-900">
                  {new Date(product.dateAdded).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="flex-1 bg-indigo-600 border border-transparent rounded-full py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">Free Shipping</span>
                <span className="text-xs text-gray-500">On orders over $50</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">2-Year Warranty</span>
                <span className="text-xs text-gray-500">Full coverage</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">30-Day Returns</span>
                <span className="text-xs text-gray-500">No questions asked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
