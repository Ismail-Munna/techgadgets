'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, PackagePlus } from "lucide-react";

const productSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  shortDescription: z.string().min(10, { message: "Short description must be at least 10 characters" }),
  fullDescription: z.string().min(20, { message: "Full description must be at least 20 characters" }),
  price: z.number({ message: "Price must be a number" }).positive({ message: "Price must be a positive number" }),
  priority: z.enum(["High", "Medium", "Low"]),
  imageUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AddProductForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      price: 0,
      priority: "Medium",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      toast.success("Product added successfully!");
      reset();
      router.push("/admin/manage-products");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred while adding the product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="title"
              {...register("title")}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g. Wireless Noise-Cancelling Headphones"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="shortDescription"
              {...register("shortDescription")}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="A brief summary of the product (1-2 lines)"
            />
            {errors.shortDescription && <p className="mt-1 text-sm text-red-600">{errors.shortDescription.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700">
            Full Description
          </label>
          <div className="mt-1">
            <textarea
              id="fullDescription"
              rows={4}
              {...register("fullDescription")}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Detailed description of the product features, specifications, etc."
            />
            {errors.fullDescription && <p className="mt-1 text-sm text-red-600">{errors.fullDescription.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              step="0.01"
              id="price"
              {...register("price", { valueAsNumber: true })}
              className="block w-full pl-7 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00"
            />
          </div>
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority Level
          </label>
          <div className="mt-1">
            <select
              id="priority"
              {...register("priority")}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL (Optional)
          </label>
          <div className="mt-1">
            <input
              type="url"
              id="imageUrl"
              {...register("imageUrl")}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>}
            <p className="mt-2 text-sm text-gray-500">
              Leave blank to use a random placeholder image.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-200 flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <PackagePlus className="mr-2 h-5 w-5" />
          )}
          Add Product
        </button>
      </div>
    </form>
  );
}
