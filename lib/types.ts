interface User {
  id: string;
  email: string;
  name?: string;
  passwordHash?: string;
  roles: string[];
}

interface Category {
  id: string;
  slug: string;
  name?: string;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in kobo
  oldPrice: number; // in kobo
  newPrice: number; // in kobo
  discountPercentage: number; // in kobo
  categoryId: string;
  imageUrls: string[];
  stock: number;
  isActive: Boolean;

  category: Category;
  //   orderItems: OrderItem[]
}
interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

interface CategoryFormData {
  name: string;
}

interface AuthResponse {
  status: number;
  token?: string;
  data?: any;
  msg?: string;
  error?: string;
}
