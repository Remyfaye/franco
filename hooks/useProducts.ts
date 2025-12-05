"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { handleDelete, handlePost, handlePut } from "@/lib/utils";

export function useProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!window.location.pathname.startsWith("/auth")) {
      getCategories();
      getProducts();
    }
  }, []);

  const getCategories = async () => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const localStorageToken = localStorage.getItem("auth-token");
      if (localStorageToken) {
        headers["Authorization"] = `Bearer ${localStorageToken}`;
      }

      const response = await fetch(`${BASE_URL}/admin/categories`, {
        method: "GET",
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log("categories report", res);

      setCategories(res.data);
      setCategoriesLoading(false);
    } catch (error: any) {
      console.log("me report", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const localStorageToken = localStorage.getItem("auth-token");
      if (localStorageToken) {
        headers["Authorization"] = `Bearer ${localStorageToken}`;
      }

      const response = await fetch(`${BASE_URL}/admin/products`, {
        method: "GET",
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log("products report", res);

      setProducts(res.data.products);
      setProductsLoading(false);
    } catch (error: any) {
      console.log("products report", error);
    } finally {
      setProductsLoading(false);
    }
  };

  const CreateCategory = async (formData: CategoryFormData) => {
    setIsLoading(true);
    // clearCache();

    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const localStorageToken = localStorage.getItem("auth-token");
      if (localStorageToken) {
        headers["Authorization"] = `Bearer ${localStorageToken}`;
      }

      const response = await fetch(`${BASE_URL}/admin/categories`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log("create category response", response);
        toast({
          title: "Failed",
          description: "something went wrongSometh",
        });
        return null;
      }

      const res: AuthResponse = await response.json();
      console.log("create category response", res);
      toast({
        title: "Successfull",
        description: "Category has been created",
      });
      console.log(`${BASE_URL}/admin/categories`);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to server",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (
    formData: Omit<AuthFormData, "name" | "confirmPassword" | "role">
  ): Promise<boolean> => {
    setIsLoading(true);
    // clearCache();

    try {
      console.log("formData", formData);
      const response = await fetch(`${BASE_URL}/admin/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        console.log("login error", response);
      }

      const res = await response.json();

      if (res.status === 200) {
        console.log("Product Created Successfully", res);

        toast({
          title: "Product Created",
          description: res.msg || "Product Created Successfully!",
        });

        return true;
      } else {
        toast({
          title: "Login Failed",
          description: res.error || "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error: any) {
      toast({
        title: "Connection Error",
        description: error.message || "Unable to connect to server",
        variant: "destructive",
      });
      console.log("login error", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category deletion
  const deleteCategory = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await handleDelete(`admin/categories?id=${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete category");
      }

      alert("Category deleted successfully!");
      window.location.reload(); // Refresh to update categories list
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(error || "Error deleting category. Please try again.");
    }
  };

  const editCategory = async (id: string, data: { name: string }) => {
    try {
      const response = await handlePut(`admin/categories?id=${id}`, data);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to edit category");
      }

      alert("Category edited successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error editing category:", error);
      alert("Error editing category");
    }
  };

  return {
    isLoading,
    categoriesLoading,
    categories,
    products,
    CreateCategory,
    createProduct,
    productsLoading,
    deleteCategory,
    editCategory,
  };
}
