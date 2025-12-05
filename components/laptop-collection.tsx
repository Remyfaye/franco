"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";

export default function LaptopCollection() {
  const [activeImage, setActiveImage] = useState(0);
  const { products, categoriesLoading, categories } = useProducts();

  const catogory = categories?.map((c) => c.name);
  const chosenCat = catogory[0];

  const productsInThatCategory = products?.filter(
    (product) => product.category.name === chosenCat
  );
  const imageUrls = productsInThatCategory?.map(
    (product) => product.imageUrls[0]
  );

  const images = [
    "/electronics-laptop-pro.jpg",
    "/electronics-headphones.jpg",
    "/electronics-smartphone-pro.jpg",
  ];

  return (
    <section className="px-4 md:px-8 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-pretty">
              Explore Our {chosenCat} Collection
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Express your creativity with our premium selection. From everyday
              essentials to bold statement pieces, find everything you need.
            </p>
            <Link href="/products?category=laptop">
              <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition w-fit">
                Shop laptop
              </button>
            </Link>
          </div>

          {/* Right side - Changing images */}
          <div className="flex flex-col items-center order-1 md:order-2">
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-6">
              {imageUrls.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === activeImage ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundImage: `url('${image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>

            {/* Image indicators */}
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeImage ? "bg-black w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
