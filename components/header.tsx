"use client";

import { Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { user } = useAuth();
  console.log("user", user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "PRODUCTS", href: "/products" },
    { label: "ABOUT US", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        📧 Become a partner - Contact us today
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            {/* Logo - Links to Home */}
            <div className="flex items-center">
              <img
                src="/franco_logo.jpeg"
                className="w-[40px] h-[40px]"
                alt="logo"
              />

              <Link
                href="/"
                className="text-2xl font-bold tracking-wider hover:text-gray-600"
              >
                Franco
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="w-full bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products"
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {!user && (
                <>
                  <Link
                    href="/signup"
                    className="text-sm font-medium hover:text-gray-600 transition"
                  >
                    Join us
                  </Link>
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:text-gray-600 transition"
                  >
                    Sign in
                  </Link>
                </>
              )}

              {user?.roles.includes("admin") && (
                <>
                  <Link
                    href="/admin"
                    className="text-sm font-medium hover:text-gray-600 transition"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {user?.roles.includes("user") &&
                !user?.roles.includes("admin") && (
                  <>
                    <Link
                      href="/admin"
                      className="text-sm font-medium hover:text-gray-600 transition"
                    >
                      Welcome {user.name}
                    </Link>
                  </>
                )}

              <Link
                href="/cart"
                className="cursor-pointer hover:text-gray-600 transition"
              >
                <ShoppingBag size={20} />
              </Link>
              <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                0
              </div>
            </div>
          </div>

          {/* Navigation - Updated to link to actual pages */}
          <nav className="flex items-center justify-center gap-8 text-sm font-medium flex-wrap">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-gray-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
