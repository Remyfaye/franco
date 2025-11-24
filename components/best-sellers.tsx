"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BestSellers() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const bestSellers = [
    {
      id: 1,
      name: "ProBook Ultra 16 - Intel i9",
      price: "1,899.99",
      image: "/electronics-laptop-pro.jpg",
    },
    {
      id: 2,
      name: "SmartPhone X Pro - 256GB",
      price: "999.99",
      image: "/electronics-smartphone-pro.jpg",
    },
    {
      id: 3,
      name: "SoundMax Wireless Headphones",
      price: "249.99",
      image: "/electronics-headphones.jpg",
    },
    {
      id: 4,
      name: "ProBook Ultra 16 - Intel i9",
      price: "1,899.99",
      image: "/electronics-laptop-pro.jpg",
    },
    {
      id: 5,
      name: "SmartPhone X Pro - 256GB",
      price: "999.99",
      image: "/electronics-smartphone-pro.jpg",
    },
  ];

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

  return (
    <section className="px-4 md:px-8 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Best Sellers</h2>
          <button className="border border-black px-6 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition">
            View all
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition -ml-6 hidden md:flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            id="best-sellers-container"
            className="overflow-x-auto flex gap-4 pb-4 scrollbar-hide scroll-smooth"
          >
            {bestSellers.map((product) => (
              <Link key={product.id} href={`/products/₦{product.id}`}>
                <div className="flex-shrink-0 w-64 group cursor-pointer">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-2 group-hover:text-gray-600 transition line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold">₦{product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition -mr-6 hidden md:flex items-center justify-center"
          >
            <ChevronRight size={24} />
          </button>
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
