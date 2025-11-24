"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

// Mock product data - would come from backend
const PRODUCTS: Record<string, any> = {
  "1": {
    id: 1,
    name: "Premium Liquid Foundation",
    price: 2500,
    rating: 4.8,
    reviews: 145,
    description:
      "Achieve a flawless, radiant complexion with our premium liquid foundation. Provides full coverage and a natural finish that lasts all day.",
    details: [
      "Long-lasting formula (up to 16 hours)",
      "Full coverage with natural finish",
      "Suitable for all skin types",
      "SPF 15 Protection",
      "Cruelty-free and vegan",
      "Available in 20 shades",
    ],
    image: "/placeholder.svg?key=mrf9v",
    images: ["/placeholder.svg?key=mrf9v", "/placeholder.svg?key=15rza", "/placeholder.svg?key=uw2nr"],
    inStock: true,
  },
  "2": {
    id: 2,
    name: "Glossy Lip Gloss",
    price: 1200,
    rating: 4.6,
    reviews: 98,
    description:
      "Add shine and color to your lips with our luxurious lip gloss. Infused with moisturizing ingredients for smooth, plump lips.",
    details: [
      "High-shine formula",
      "Moisturizing ingredients",
      "Non-sticky texture",
      "Available in 12 shades",
      "Cruelty-free",
      "Long-lasting color",
    ],
    image: "/placeholder.svg?key=ywx0d",
    images: ["/placeholder.svg?key=ywx0d", "/placeholder.svg?key=bseoz", "/placeholder.svg?key=9fhkl"],
    inStock: true,
  },
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS[params.id] || PRODUCTS["1"]
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-600">
            <Link href="/products" className="hover:text-black">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black font-medium">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? "border-black" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-600">({product.reviews} reviews)</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="text-3xl font-bold mb-6">₦{(product.price / 100).toFixed(2)}</p>
                <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-lg font-bold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.details.map((detail: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-black font-bold mt-1">✓</span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center gap-6">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-100">
                      +
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg"
                >
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </Button>

                <Link href="/cart">
                  <Button variant="outline" className="w-full py-3 text-lg bg-transparent">
                    View Cart
                  </Button>
                </Link>
              </div>

              {/* Shipping Info */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                <div className="flex gap-3">
                  <span className="text-lg">📦</span>
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders over ₦50,000</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-lg">🔄</span>
                  <div>
                    <p className="font-semibold">Easy Returns</p>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-lg">✅</span>
                  <div>
                    <p className="font-semibold">Authentic Products</p>
                    <p className="text-sm text-gray-600">100% genuine guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20 pt-20 border-t">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((id) => (
                <Link key={id} href={`/products/${id}`}>
                  <div className="group cursor-pointer">
                    <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-48">
                      <img
                        src={`/ceholder-svg-key-rel.jpg?key=rel${id}`}
                        alt="Related product"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold line-clamp-2">Related Product {id}</h3>
                    <p className="text-gray-600 text-sm">₦{(Math.random() * 5000).toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
