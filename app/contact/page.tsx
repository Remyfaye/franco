"use client";

import type React from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - form submission would be handled by backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            We'd love to hear from you. Get in touch with us today.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-700">francoonlinestore.ng@gmail.com</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-700">+234 903 659 6893</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p className="text-gray-700">
                  129 Nnamdi Azikiwe street ,
                  <br />
                  Idumota Lagos Island
                  <br />
                  Lagos Nigeria
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
