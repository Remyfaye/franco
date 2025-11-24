import { Star, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ProductGrid() {
  const products = [
    {
      id: 1,
      name: "ProBook Ultra 16 - Intel i9",
      price: "1,899.99",
      rating: 5,
      image: "/electronics-laptop-pro.jpg",
    },
    {
      id: 2,
      name: "SmartPhone X Pro - 256GB",
      price: "999.99",
      rating: 5,
      image: "/electronics-smartphone-pro.jpg",
    },
    {
      id: 3,
      name: "SoundMax Wireless Headphones",
      price: "249.99",
      rating: 5,
      image: "/electronics-headphones.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <div className="group cursor-pointer">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-200 transition opacity-0 group-hover:opacity-100 transition-opacity">
                <ShoppingBag size={18} />
              </button>
            </div>

            <div className="flex gap-1 mb-2">
              {[...Array(product.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <h3 className="font-medium text-sm mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-lg font-bold">₦{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
