"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const [processing, setProcessing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    // Frontend only - actual payment would be handled by backend
    setTimeout(() => {
      window.location.href = "/order-success"
    }, 2000)
  }

  const total = 625000 // Mock total

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-12">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="sm:col-span-2"
                  />
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="sm:col-span-2"
                  />
                  <Input
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="sm:col-span-2"
                  />
                  <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                  <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                  <Input
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <Input
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                    <Input name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg"
              >
                {processing ? "Processing..." : "Complete Order"}
              </Button>
            </form>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Liquid Foundation × 1</span>
                  <span>₦25.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Eye Shadow Palette × 2</span>
                  <span>₦70.00</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦95.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₦10.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₦8.75</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₦{(total / 100).toFixed(2)}</span>
                </div>
              </div>

              <Link href="/cart">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
