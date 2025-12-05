"use client";

import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import { handlePost } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const { user, userLoading } = useAuth();
  const [processing, setProcessing] = useState(false);
  const {
    cart,
    cartLoading,
    updateCartItem,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow mb-4">
                <div className="flex space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to see them here.
          </p>
          <Link
            href="/products"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    // router.push("/checkout");
    if (!userLoading) {
      if (!user) {
        router.push("/login");
        return null;
      }
    }

    setProcessing(true);
    const formData = { items: cart.items, email: user?.email };
    try {
      const response = await handlePost("checkout/initiate", formData);
      const data = await response.json();
      console.log(data);
      router.push(`${data.authorization_url}`);
      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header />
      <div className="max-w-6xl mx-auto px-4 mt-5 mb-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart ({totalItems} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow">
                <div className="flex space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.imageUrls[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="font-medium text-gray-900 hover:text-gray-600 capitalize">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {item.product.description}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      ₦{item.product.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mt-3">
                      <button
                        onClick={() =>
                          updateCartItem(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateCartItem(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} />
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 p-1 text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Stock Info */}
                    {item.product.stock < 10 && (
                      <p className="text-xs text-orange-600 mt-2">
                        Only {item.product.stock} left in stock
                      </p>
                    )}
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₦0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₦0</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₦{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={processing}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                {processing ? "Processing..." : "Proceed to Checkout"}
              </button>

              <Link
                href="/products"
                className="block text-center text-gray-600 hover:text-gray-800 mt-4 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
