"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // If page is restored from bfcache, refresh auth state
      if (event.persisted) {
        console.log("Page restored from bfcache, refreshing auth...");
        getCurrentUser(true);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  useEffect(() => {
    if (!window.location.pathname.startsWith("/auth")) {
      getCurrentUser();
    }
  }, []);

  const getCurrentUser = async (forceRefresh = false): Promise<User | null> => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const localStorageToken = localStorage.getItem("auth-token");
      if (localStorageToken) {
        headers["Authorization"] = `Bearer ${localStorageToken}`;
      }

      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          // clearCache();
          setUser(null);
          setUserLoading(false);
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log("me report", res);

      if (res.status === 200 && res.data) {
        // cacheUser(res.data);
        setUser(res.data);
        setUserLoading(false);
        return res.data;
      } else {
        // clearCache();
        setUser(null);
        setUserLoading(false);
        return null;
      }
    } catch (error: any) {
      setUser(null);
      setUserLoading(false);
      return null;
    }
  };

  const refreshUser = async (): Promise<void> => {
    await getCurrentUser(true);
    window.location.reload();
  };

  const signUp = async (formData: AuthFormData): Promise<boolean> => {
    setIsLoading(true);
    // clearCache();

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const res: AuthResponse = await response.json();

      if (res.status === 200) {
        localStorage.setItem("pending_email", formData.email);

        toast({
          title: "Verify Your Email",
          description: "Check your email for verification link.",
        });

        router.push(
          `/auth/verify-email?email=${encodeURIComponent(formData.email)}`
        );
        return true;
      } else {
        toast({
          title: "Signup Failed",
          description: res.error || "Something went wrong",
          variant: "destructive",
        });
        return false;
      }
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

  const login = async (
    formData: Omit<AuthFormData, "name" | "confirmPassword" | "role">
  ): Promise<boolean> => {
    setIsLoading(true);
    // clearCache();

    try {
      console.log("formData", formData);
      const response = await fetch(`${BASE_URL}/auth/login`, {
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

      if (res.token) {
        localStorage.setItem("auth-token", res.token);
      }

      if (res.status === 200) {
        if (res.data) {
          // cacheUser(res.data);
          setUser(res.data);
        }

        toast({
          title: "Welcome back! 👋",
          description: res.msg || "Logged in successfully!",
        });

        if (res?.data.isAdmin) {
          window.location.href = "/admin";
        } else if (res?.data.isPublisher) {
          window.location.href = "/";
        }

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

  const logout = async (): Promise<void> => {
    // Set logout flag in multiple storage locations
    localStorage.setItem("logout_flag", Date.now().toString());

    // Clear all auth data
    setUser(null);
    // clearCache();

    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      console.log("respose,", response);

      if (!response.ok) {
        throw new Error(`Logout failed with status: ${response.status}`);
      } else {
        toast({
          title: "Logged out successfully",
          description: "You have been logged out.",
        });

        // Force a full page reload to clear bfcache and React state
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("Backend logout failed:", error);
      toast({
        title: "Log out Failed",
        description: "error",
      });
    }
  };

  const googleLogin = async (role: string = "publisher"): Promise<void> => {
    // clearCache();

    try {
      const response = await fetch(`${BASE_URL}/auth/google?role=${role}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to get Google auth URL");
      }

      const data = await response.json();

      if (data.data?.authUrl) {
        window.location.href = data.data.authUrl;
      } else {
        throw new Error("No auth URL received");
      }
    } catch (error: any) {
      toast({
        title: "Google Login Failed",
        description: error.message || "Failed to initiate Google login",
        variant: "destructive",
      });
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Reset Email Sent",
          description: "Check your email for password reset instructions.",
        });
        return true;
      } else {
        toast({
          title: "Reset Failed",
          description: data.error || "Failed to send reset email",
          variant: "destructive",
        });
        return false;
      }
    } catch (error: any) {
      toast({
        title: "Connection Error",
        description: "Failed to send reset email",
        variant: "destructive",
      });
      return false;
    }
  };

  const resetPassword = async (
    token: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Password Reset",
          description: "Your password has been reset successfully.",
        });
        return true;
      } else {
        toast({
          title: "Reset Failed",
          description: data.error || "Failed to reset password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error: any) {
      toast({
        title: "Connection Error",
        description: "Failed to reset password",
        variant: "destructive",
      });
      return false;
    }
  };

  const sendVerificationEmail = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/send-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Verification Email Sent",
          description: "Please check your email to verify your account.",
        });
        return true;
      } else {
        toast({
          title: "Verification Failed",
          description: data.error || "Failed to send verification email",
          variant: "destructive",
        });
        return false;
      }
    } catch (error: any) {
      toast({
        title: "Connection Error",
        description: "Failed to send verification email",
        variant: "destructive",
      });
      return false;
    }
  };

  const isAuthenticated = (): boolean => {
    return !!user;
  };

  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role) || false;
  };

  return {
    isLoading,
    userLoading,
    user,
    signUp,
    login,
    googleLogin,
    logout,
    refreshUser,
    getCurrentUser,
    isAuthenticated,
    hasRole,
    sendVerificationEmail,
    forgotPassword,
    resetPassword,
  };
}
