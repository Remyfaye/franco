"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrderSuccessPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8 text-left">
            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b">
                <span className="text-gray-600">Order Number</span>
                <span className="font-bold">{orderNumber}</span>
              </div>
              <div className="flex justify-between pb-4 border-b">
                <span className="text-gray-600">Order Date</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between pb-4 border-b">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-semibold">3-5 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-lg">₦625.00</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold mb-4">What's Next?</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ You'll receive a confirmation email shortly</li>
              <li>✓ Track your order status anytime</li>
              <li>✓ Your items will be carefully packaged and shipped</li>
              <li>✓ We'll notify you when your order ships</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full bg-black text-white hover:bg-gray-800">Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                View Your Orders
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
