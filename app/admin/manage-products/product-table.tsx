'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Eye, Loader2 } from "lucide-react";
import type { Product } from "@/lib/data";

type ProductRow = Omit<
  Product,
  "title" | "imageUrl" | "shortDescription" | "price" | "priority" | "dateAdded"
> & {
  title?: string | null;
  name?: string | null;
  imageUrl?: string | null;
  shortDescription?: string | null;
  price?: number | null;
  priority?: string | null;
  dateAdded?: string | null;
};

const FALLBACK_IMAGE_URL = "https://picsum.photos/seed/product-fallback/600/400";
const NEXT_IMAGE_HOSTS = new Set(["picsum.photos"]);

function getProductName(product: ProductRow) {
  return product.title?.trim() || product.name?.trim() || "Untitled product";
}

function getProductImage(product: ProductRow) {
  if (typeof product.imageUrl === "string" && product.imageUrl.trim()) {
    return product.imageUrl.trim();
  }

  return FALLBACK_IMAGE_URL;
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

export default function ProductTable() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
        router.refresh();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-12">
        <p className="text-sm text-gray-500">No products found. Add some products to see them here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Product
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Price
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Priority
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Date Added
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.map((product) => {
            const productName = getProductName(product);
            const imageSrc = brokenImages[product.id]
              ? FALLBACK_IMAGE_URL
              : getProductImage(product);
            const useNextImage = canUseNextImage(imageSrc);
            const priceLabel =
              typeof product.price === "number" ? `$${product.price.toFixed(2)}` : "N/A";
            const priorityLabel = product.priority || "Unspecified";
            const priorityClasses =
              priorityLabel === "High"
                ? "bg-red-100 text-red-800"
                : priorityLabel === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : priorityLabel === "Low"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700";
            const dateLabel = product.dateAdded
              ? new Date(product.dateAdded).toLocaleDateString()
              : "N/A";

            return (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 relative rounded-md overflow-hidden bg-gray-100">
                      {useNextImage ? (
                        <Image
                          src={imageSrc}
                          alt={productName}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                          sizes="40px"
                          onError={() =>
                            setBrokenImages((current) => ({
                              ...current,
                              [product.id]: true,
                            }))
                          }
                        />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={imageSrc}
                          alt={productName}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.src = FALLBACK_IMAGE_URL;
                          }}
                        />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs">
                        {productName}
                      </div>
                      <div className="text-gray-500 text-sm truncate max-w-[200px] sm:max-w-xs">
                        {product.shortDescription || "No description available"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {priceLabel}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${priorityClasses}`}>
                    {priorityLabel}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {dateLabel}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/products/${product.id}`} className="text-indigo-600 hover:text-indigo-900 flex items-center">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="text-red-600 hover:text-red-900 flex items-center disabled:opacity-50"
                    >
                      {deletingId === product.id ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-1" />
                      )}
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
