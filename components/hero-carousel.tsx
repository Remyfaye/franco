"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      image: "/electronics-laptop-hero.jpg",
      title: "Latest Laptops",
    },
    {
      image: "/electronics-smartphones-hero.jpg",
      title: "New Smartphones",
    },
    {
      image: "/electronics-audio-hero.jpg",
      title: "Premium Audio",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-amber-900 h-96 md:h-[500px] overflow-hidden">
      {/* Carousel Image with fade animation */}
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-700 animate-fadeIn"
        style={{
          backgroundImage: `url('${slides[currentSlide].image}')`,
          animation: "fadeIn 0.7s ease-in-out",
        }}
      />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 h-3 rounded-full ${
              index === currentSlide
                ? "bg-white w-8 scale-110"
                : "bg-white/50 w-3 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
