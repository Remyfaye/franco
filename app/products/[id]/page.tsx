"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export default function ProductDetailPage() {
  const params = useParams();
  const { categories, products, productsLoading } = useProducts();
  let product = products?.find((p) => p.id === params.id);
  const router = useRouter();

  const categoryIdOfProduct = product?.categoryId;
  const relatedProducts = products.filter(
    (p) => p.categoryId === categoryIdOfProduct
  );
  console.log("a product", product);
  console.log("categoryIdOfProduct", relatedProducts);
  const { user } = useAuth();
  const { loading, addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async (product: Product | undefined) => {
    if (!user) {
      toast({
        title: " Login Required",
        description: `Please login to add to cart`,
        duration: 2000,
      });

      router.push("/login");

      return;
    }
    const success = await addToCart(product);
    if (success) {
      toast({
        title: "Added to Cart!",
        description: `${product?.name} has been added successfully.`,
        duration: 2000,
      });
      setAddedToCart(true);
    }
  };

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
            <span className="text-black font-medium">{product?.name}</span>
          </div>

          {productsLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {/* Product imageUrls */}
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
                  <img
                    src={
                      product?.imageUrls?.[selectedImage] || "/placeholder.svg"
                    }
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3">
                  {product?.imageUrls.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx
                          ? "border-black"
                          : "border-gray-200"
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
                  <h1 className="text-4xl font-bold mb-4">{product?.name}</h1>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">★</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        (product?.stock ?? 0) > 1
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {(product?.stock ?? 0) > 1 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <p className="text-3xl font-bold mb-6">₦{product?.price}</p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {product?.description}
                  </p>
                </div>

                {/* Details */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold mt-1">✓</span>
                      <span className="text-gray-700">
                        {product?.description}
                      </span>
                    </li>
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
                      <span className="px-6 py-2 font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={loading}
                    className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg"
                  >
                    {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                  </Button>

                  <Link href="/cart">
                    <Button
                      variant="outline"
                      className="w-full py-3 text-lg bg-transparent"
                    >
                      View Cart
                    </Button>
                  </Link>
                </div>

                {/* Shipping Info */}
                {/* <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  <div className="flex gap-3">
                    <span className="text-lg">📦</span>
                    <div>
                      <p className="font-semibold">Free Shipping</p>
                      <p className="text-sm text-gray-600">
                        On orders over ₦50,000
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg">🔄</span>
                    <div>
                      <p className="font-semibold">Easy Returns</p>
                      <p className="text-sm text-gray-600">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg">✅</span>
                    <div>
                      <p className="font-semibold">Authentic Products</p>
                      <p className="text-sm text-gray-600">
                        100% genuine guarantee
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {/* Related Products */}
          <div className="mt-20 pt-20 border-t">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/products/${item.id}`}>
                  <div className="group cursor-pointer">
                    <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-48">
                      <img
                        src={item.imageUrls[0]}
                        alt="Related product"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm">₦{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
