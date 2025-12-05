"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    description?: string;
    imageUrls: string[];
    stock: number;
    category: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Load cart on component mount
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      setCartLoading(true);
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const localStorageToken = localStorage.getItem("auth-token");
      if (localStorageToken) {
        headers["Authorization"] = `Bearer ${localStorageToken}`;
      }

      const response = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      setCart(res.data);
    } catch (error: any) {
      console.error("Get cart error:", error);
      // If unauthorized, user needs to login
      if (error.message.includes("401")) {
        setCart(null);
      }
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (product: any, quantity: number = 1) => {
    try {
      setLoading(true);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const localStorageToken = localStorage.getItem("auth-token");
      if (localStorageToken) {
        headers["Authorization"] = `Bearer ${localStorageToken}`;
      }

      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add to cart");
      }

      const res = await response.json();
      setCart(res.data);

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });

      return true;
    } catch (error: any) {
      console.error("Add to cart error:", error);

      if (error.message.includes("Unauthorized")) {
        toast({
          title: "Please login",
          description: "You need to login to add items to cart",
          variant: "destructive",
        });
        router.push("/login");
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to add item to cart",
          variant: "destructive",
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (cartItemId: string, quantity: number) => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const localStorageToken = localStorage.getItem("auth-token");
      if (localStorageToken) {
        headers["Authorization"] = `Bearer ${localStorageToken}`;
      }

      const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await getCart(); // Refresh cart
      return true;
    } catch (error) {
      console.error("Update cart item error:", error);
      return false;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const localStorageToken = localStorage.getItem("auth-token");
      if (localStorageToken) {
        headers["Authorization"] = `Bearer ${localStorageToken}`;
      }

      const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
        method: "DELETE",
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await getCart(); // Refresh cart

      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });

      return true;
    } catch (error) {
      console.error("Remove from cart error:", error);
      return false;
    }
  };

  const clearCart = async () => {
    if (!cart?.items.length) return;

    try {
      // Remove all items one by one (you might want to create a bulk delete endpoint)
      for (const item of cart.items) {
        await removeFromCart(item.id);
      }
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  return {
    cart,
    loading,
    cartLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCart,
    totalItems: cart?.totalItems || 0,
    totalPrice: cart?.totalPrice || 0,
  };
}
