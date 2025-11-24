import { Star } from "lucide-react";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import CategorySection from "@/components/category-section";
import ProductGrid from "@/components/product-grid";
import Footer from "@/components/footer";
import BestSellers from "@/components/best-sellers";
import LaptopCollection from "@/components/laptop-collection";
import ProductsCollection from "@/components/products-collection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Category Grid */}
      <CategorySection />

      {/* Best Sellers Section */}
      <BestSellers />

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
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg p-4">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                {item === 1 && (
                  <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded inline-block mb-2">
                    Out of Stock
                  </span>
                )}
                <p className="font-medium text-sm mb-2">Product Name</p>
                <p className="text-lg font-bold">₦19.99</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
