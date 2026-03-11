'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  FALLBACK_PRODUCT_IMAGE_URL,
  type ProductRecord,
} from "@/lib/product-store";

const NEXT_IMAGE_HOSTS = new Set(["picsum.photos"]);
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const PRIORITY_STYLES: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  High: "bg-rose-50 text-rose-700 ring-rose-200",
};

function getProductName(product: ProductRecord) {
  return product.title?.trim() || product.name?.trim() || "Untitled product";
}

function getProductImage(product: ProductRecord) {
  return product.imageUrl?.trim() || FALLBACK_PRODUCT_IMAGE_URL;
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

function ProductTableSkeleton() {
  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto">
        <div className="min-w-[760px] overflow-hidden rounded-2xl border border-slate-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[minmax(260px,2.5fr)_1fr_1fr_1fr_1fr] items-center gap-4 border-b border-slate-200 px-4 py-4 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-56 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100" />
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              <div className="ml-auto h-4 w-24 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductTable() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [productToDelete, setProductToDelete] = useState<ProductRecord | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();

        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async () => {
    if (!productToDelete) {
      return;
    }

    setDeletingId(productToDelete.id);

    try {
      const response = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productToDelete.id)
      );
      setProductToDelete(null);
      toast.success("Product deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred while deleting the product");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
          <p className="text-base font-medium text-slate-900">
            No products found. Add your first product.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80">
            <tr>
              <th
                scope="col"
                className="py-4 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:pl-6"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Priority
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Date Added
              </th>
              <th
                scope="col"
                className="py-4 pl-3 pr-4 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:pr-6"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {products.map((product) => {
              const productName = getProductName(product);
              const imageSrc = brokenImages[product.id]
                ? FALLBACK_PRODUCT_IMAGE_URL
                : getProductImage(product);
              const priorityLabel = product.priority || "Medium";
              const priceLabel = currencyFormatter.format(product.price || 0);
              const dateLabel = product.dateAdded
                ? dateFormatter.format(new Date(product.dateAdded))
                : "N/A";
              const priorityClasses =
                PRIORITY_STYLES[priorityLabel] ||
                "bg-slate-100 text-slate-700 ring-slate-200";

              return (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="py-4 pl-4 pr-3 align-middle sm:pl-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        {canUseNextImage(imageSrc) ? (
                          <Image
                            src={imageSrc}
                            alt={productName}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                            sizes="48px"
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
                              event.currentTarget.src = FALLBACK_PRODUCT_IMAGE_URL;
                            }}
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {productName}
                        </p>
                        <p className="max-w-[14rem] truncate text-sm text-slate-500 sm:max-w-[24rem]">
                          {product.shortDescription || "No description available"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600">
                    {priceLabel}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${priorityClasses}`}
                    >
                      {priorityLabel}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600">
                    {dateLabel}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="inline-flex items-center gap-1 text-indigo-600 transition-colors hover:text-indigo-800"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => setProductToDelete(product)}
                        disabled={deletingId === product.id}
                        className="inline-flex items-center gap-1 text-rose-600 transition-colors hover:text-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === product.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
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

      {productToDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <h2
              id="delete-product-title"
              className="text-lg font-semibold text-slate-900"
            >
              Delete product?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                {getProductName(productToDelete)}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={deletingId === productToDelete.id}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deletingId === productToDelete.id}
                className="inline-flex items-center rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === productToDelete.id ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
