import { useCart } from "@/hooks/useCart";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import React from "react";
import { useToast } from "./use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AddToCart = ({ product }: { product: any }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, addToCart, updateCartItem, removeFromCart, loading } =
    useCart();
  const { toast } = useToast();

  // Check if product is already in cart
  const cartItem = cart?.items?.find((item) => item.productId === product.id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: " Login Required",
        description: `Please login to add to cart`,
        duration: 2000,
      });

      router.push("/login");

      return;
    }
    const success = await addToCart(product);
    if (success) {
      toast({
        title: "Added to Cart!",
        description: `${product.name} has been added successfully.`,
        duration: 2000,
      });
    }
  };

  const handleIncreaseQuantity = async () => {
    if (!cartItem) return;

    const success = await updateCartItem(cartItem.id, currentQuantity + 1);
    if (success) {
      toast({
        title: "Cart Updated!",
        description: `Increased ${product.name} quantity to ${
          currentQuantity + 1
        }.`,
        duration: 1500,
      });
    }
  };

  const handleDecreaseQuantity = async () => {
    if (!cartItem) return;

    if (currentQuantity === 1) {
      // If quantity is 1, remove from cart entirely
      const success = await removeFromCart(cartItem.id);
      if (success) {
        toast({
          title: "Removed from Cart",
          description: `${product.name} has been removed from your cart.`,
          duration: 1500,
        });
      }
    } else {
      // Decrease quantity
      const success = await updateCartItem(cartItem.id, currentQuantity - 1);
      if (success) {
        toast({
          title: "Cart Updated!",
          description: `Decreased ${product.name} quantity to ${
            currentQuantity - 1
          }.`,
          duration: 1500,
        });
      }
    }
  };

  // If product is in cart, show quantity controls
  if (isInCart) {
    return (
      <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-lg group-hover:opacity-100 transition-opacity flex items-center space-x-1">
        {/* Decrease Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDecreaseQuantity();
          }}
          disabled={loading}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition disabled:opacity-50"
        >
          <Minus size={14} />
        </button>

        {/* Quantity Display */}
        <span className="text-xs font-medium min-w-[20px] text-center">
          {currentQuantity}
        </span>

        {/* Increase Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleIncreaseQuantity();
          }}
          disabled={loading || currentQuantity >= product.stock}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition disabled:opacity-50"
        >
          <Plus size={14} />
        </button>
      </div>
    );
  }

  // If product is not in cart, show add to cart button
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAddToCart();
      }}
      disabled={loading || product.stock === 0}
      className={`
        absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-200 transition 
        group-hover:opacity-100 transition-opacity
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
        ${product.stock === 0 ? "opacity-30 cursor-not-allowed" : ""}
      `}
      title={product.stock === 0 ? "Out of stock" : "Add to cart"}
    >
      <ShoppingBag size={18} />
    </button>
  );
};

export default AddToCart;
