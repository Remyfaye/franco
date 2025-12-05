"use client";
import { Star } from "lucide-react";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import CategorySection from "@/components/category-section";
import ProductGrid from "@/components/product-grid";
import Footer from "@/components/footer";
import BestSellers from "@/components/best-sellers";
import LaptopCollection from "@/components/laptop-collection";
import ProductsCollection from "@/components/products-collection";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import AddToCart from "@/components/ui/addToCart-button";

export default function Home() {
  const { categories, products, categoriesLoading, productsLoading } =
    useProducts();
  const cart = useCart();
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Category Grid */}
      <CategorySection />

      {/* LOADER */}

      {categoriesLoading && (
        <div className="max-w-7xl m-5 lg:m-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold capitalize">
              {categoriesLoading ? (
                <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
              ) : (
                <></>
              )}
            </h2>

            {!categoriesLoading && (
              <button className="border border-black px-6 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition">
                View all
              </button>
            )}
          </div>
          <div className="overflow-x-auto flex gap-4 pb-4 scrollbar-hide scroll-smooth">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="  flex-shrink-0 w-64 animate-pulse cursor-wait"
              >
                <div className="w-full aspect-square rounded-lg bg-gray-200 mb-4" />
                <div className="h-4 w-44 bg-gray-200 rounded mb-2" />
                <div className="h-5 w-24 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Sellers Section */}
      {categories.map((item, index) => (
        <BestSellers key={item.id} category={item} />
      ))}

      {/* Skincare Collection Section */}
      <ProductsCollection />

      {/* Featured Products */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured</h2>
            <button className="border border-black px-6 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition">
              View all
            </button>
          </div>

          <ProductGrid />
        </div>
      </section>

      {/* Makeup Collection Section */}
      <LaptopCollection />

      {/* Recommended Section */}
      <section className="bg-amber-100 px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recommended for you</h2>
            <button className="text-sm font-medium">View all</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products?.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4">
                <div className="bg-gray-200 h-64 rounded-lg mb-4">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: `url('${item.imageUrls}')`,
                    }}
                  />
                </div>
                <AddToCart product={item} />
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                {item.stock === 1 && (
                  <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded inline-block mb-2">
                    Out of Stock
                  </span>
                )}
                <p className="font-medium text-sm mb-2">{item.name}</p>
                <p className="text-lg font-bold">₦{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
