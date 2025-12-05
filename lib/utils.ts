import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleGet(url: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const localStorageToken = localStorage.getItem("auth-token");
  if (localStorageToken) {
    headers["Authorization"] = `Bearer ${localStorageToken}`;
  }

  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "GET",
    headers,
    credentials: "include",
  });

  return response;
}

export async function handlePost(url: string, formData: any) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const localStorageToken = localStorage.getItem("auth-token");
  if (localStorageToken) {
    headers["Authorization"] = `Bearer ${localStorageToken}`;
  }

  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(formData),
  });

  return response;
}

export async function handlePut(url: string, formData: any) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const localStorageToken = localStorage.getItem("auth-token");
  if (localStorageToken) {
    headers["Authorization"] = `Bearer ${localStorageToken}`;
  }

  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "PUT",
    headers,
    credentials: "include",
    body: JSON.stringify(formData),
  });

  return response;
}
