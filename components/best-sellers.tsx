"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import AddToCart from "./ui/addToCart-button";

export default function BestSellers({ category }: { category: Category }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { categoriesLoading } = useProducts();
  const { addToCart, loading } = useCart();

  const scroll = (direction: string) => {
    const container = document.getElementById("best-sellers-container");
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = async (product: any) => {
    const success = await addToCart(product);
    if (success) {
      // Optional: You can add a success animation here
    }
  };

  return (
    <section className="px-4 md:px-8 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold capitalize">
            {categoriesLoading ? (
              <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
            ) : (
              category.name
            )}
          </h2>

          {!categoriesLoading && (
            <Link href={"/products"}>
              <button className="border border-black px-6 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition">
                View all
              </button>
            </Link>
          )}
        </div>

        {/* CONTENT */}
        <div className="relative">
          {!categoriesLoading && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition -ml-6 hidden md:flex items-center justify-center"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div
            id={!categoriesLoading ? "best-sellers-container" : undefined}
            className="overflow-x-auto flex gap-4 pb-4 scrollbar-hide scroll-smooth"
          >
            {/* LOADER */}
            {categoriesLoading &&
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-64 animate-pulse cursor-wait"
                >
                  <div className="w-full aspect-square rounded-lg bg-gray-200 mb-4" />
                  <div className="h-4 w-44 bg-gray-200 rounded mb-2" />
                  <div className="h-5 w-24 bg-gray-300 rounded" />
                </div>
              ))}

            {/* PRODUCTS */}
            {!categoriesLoading &&
              category.products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 group cursor-pointer relative"
                >
                  {/* IMAGE */}
                  <Link href={`/products/${product.id}`}>
                    <div className="relative rounded-lg overflow-hidden mb-4 aspect-square bg-neutral-200 dark:bg-neutral-200">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{
                          backgroundImage: `url('${product.imageUrls[0]}')`,
                          backgroundColor: "#ddddddff",
                          mixBlendMode: "multiply",
                        }}
                      />
                      <AddToCart product={product} />

                      {/* Discount Badge — moved to LEFT so it doesn't cover cart */}
                      {product.discountPercentage && (
                        <div
                          className="
    absolute top-2 left-2 z-20
    bg-gradient-to-b from-red-600 to-red-700
    text-white font-extrabold
    text-[10px] px-3 py-1
    rounded-md shadow-lg
    transform -rotate-6
    tracking-wider
    border border-red-800
  "
                        >
                          🔥 {product.discountPercentage}% OFF
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* PRODUCT INFO */}
                  <Link href={`/products/${product.id}`}>
                    <h3 className="capitalize font-medium text-sm mb-2 group-hover:text-gray-600 transition line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  {/* PRICE */}
                  <div className="flex items-center space-x-2">
                    {product.oldPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        ₦{product.oldPrice}
                      </p>
                    )}
                    <p className="text-lg font-bold text-[#0d203b]">
                      ₦{product.price}
                    </p>
                  </div>

                  {/* Stock indicator */}
                  {product.stock < 10 && product.stock > 0 && (
                    <p className="text-xs text-orange-600 mt-1">
                      Only {product.stock} left in stock
                    </p>
                  )}
                  {product.stock === 0 && (
                    <p className="text-xs text-red-600 mt-1">Out of stock</p>
                  )}
                </div>
              ))}
          </div>

          {!categoriesLoading && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition -mr-6 hidden md:flex items-center justify-center"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
