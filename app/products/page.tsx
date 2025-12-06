"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/useProducts";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import AddToCart from "@/components/ui/addToCart-button";
import { useRouter } from "next/navigation";

// Mock product data - would come from backend
const PRODUCTS = [
  {
    id: 1,
    name: "headphones",
    price: 2500,
    category: "makeup",
    image: "/electronics-headphones.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "smartphone",
    price: 1200,
    category: "smartphone",
    image: "/electronics-smartphone-pro.jpg",
    rating: 4.6,
  },
  {
    id: 3,
    name: "laptop",
    price: 3500,
    category: "laptop",
    image: "/electronics-laptop-pro.jpg",
    rating: 4.9,
  },
  {
    id: 4,
    name: "smartphone",
    price: 2800,
    category: "smartphone",
    image: "/electronics-smartphone-pro.jpg",
    rating: 4.7,
  },
  {
    id: 5,
    name: "laptop",
    price: 1800,
    category: "laptop",
    image: "/electronics-laptop-pro.jpg",
    rating: 4.5,
  },
  {
    id: 6,
    name: "headphones",
    price: 1600,
    category: "headphones",
    image: "/electronics-headphones.jpg",
    rating: 4.8,
  },
];

export default function ProductsPage() {
  const { categories, products, productsLoading } = useProducts();
  const router = useRouter();

  const CATEGORIES = [{ name: "All", id: "1" }, ...categories];
  const [selectedCategory, setSelectedCategory] = useState("1");
  console.log("CATEGORIES", CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "1" || product.category.id === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Products</h1>

          {/* Search and Filters */}
          <div className="space-y-6 mb-12">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />

            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`capitalize px-6 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {productsLoading && (
            <div className="flex justify-center items-center py-20 w-full">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                  <img
                    src={product.imageUrls[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onClick={() => router.push(`/products/${product.id}`)}
                  />
                  <AddToCart product={product} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">₦{product.price}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
