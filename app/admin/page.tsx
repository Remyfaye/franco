"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  ShoppingBag,
} from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import { handleGet, handlePut } from "@/lib/utils";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { categories, products } = useProducts();
  console.log("products:", products);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-black text-white p-4 lg:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl lg:text-2xl font-bold">Franco Admin</h1>
          </div>
          <button className="px-3 py-2 lg:px-4 lg:py-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-sm lg:text-base">
            <Link href={"/"}>Home</Link>
          </button>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gray-900 text-white p-6 space-y-4
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <div className="flex items-center justify-between mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {[
            { id: "overview", label: "Dashboard" },
            { id: "products", label: "Products" },
            { id: "categories", label: "Categories" },
            { id: "orders", label: "Orders" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                activeTab === item.id ? "bg-black" : "hover:bg-gray-800"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 w-full lg:w-auto">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "categories" && <CategoriesTab />}
          {activeTab === "orders" && <OrdersTab />}
        </main>
      </div>
    </div>
  );
}

function OverviewTab() {
  const { categories, products, productsLoading } = useProducts();
  console.log("products in OverviewTab ", products);

  if (productsLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">
        Dashboard Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {[
          { label: "Total Products", value: products.length },
          { label: "Categories", value: categories?.length },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 lg:p-6 shadow">
            <p className="text-gray-600 text-xs lg:text-sm">{stat.label}</p>
            <p className="text-xl lg:text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg p-4 lg:p-6 shadow">
        <h3 className="text-lg lg:text-xl font-bold mb-4">Recent Products</h3>

        {/* Mobile Cards View */}
        <div className="lg:hidden space-y-4">
          {products?.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium capitalize">{item.name}</span>
              </div>
              <div className="text-sm text-gray-600"> {item.description}</div>
              <div className="font-medium">₦{item.price}</div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Description</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 capitalize w-[30%] ">{item.name}</td>
                  <td className="py-3 w-[100%] line-clamp-3 ">
                    {item.description}
                  </td>
                  <td className="py-3 w-[15%] ">₦{item.price}</td>
                  <td className="py-3 w-[5%] ">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductsTab() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit states
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editSelectedImages, setEditSelectedImages] = useState<File[]>([]);
  const [editImagePreviews, setEditImagePreviews] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const { categories, products, productsLoading } = useProducts();

  // Handle image selection for add form
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    setSelectedImages((prev) => [...prev, ...newImages]);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Handle image selection for edit form
  const handleEditImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    setEditSelectedImages((prev) => [...prev, ...newImages]);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setEditImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove selected image from add form
  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove selected image from edit form
  const removeEditImage = (index: number) => {
    setEditSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setEditImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove existing image from edit form
  const removeExistingImage = (index: number) => {
    if (editingProduct) {
      const updatedImages = [...editingProduct.imageUrls];
      updatedImages.splice(index, 1);
      setEditingProduct({
        ...editingProduct,
        imageUrls: updatedImages,
      });
    }
  };

  // Clean up preview URLs
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      editImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews, editImagePreviews]);

  // Handle add form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch(`${BASE_URL}/admin/products`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const result = await response.json();
      setSelectedImages([]);
      setImagePreviews([]);
      setShowAddForm(false);
      alert("Product created successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(true);

    const formData = new FormData(event.currentTarget);

    // Add existing images as comma-separated string
    if (editingProduct?.imageUrls) {
      formData.append("existingImages", editingProduct.imageUrls.join(","));
    }

    // Add new images
    editSelectedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch(
        `${BASE_URL}/admin/products/${editingProduct.id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const result = await response.json();
      setEditingProduct(null);
      setEditSelectedImages([]);
      setEditImagePreviews([]);
      alert("Product updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  // Open edit modal
  const handleEdit = async (product: any) => {
    setEditingProduct(product);
    setEditSelectedImages([]);
    setEditImagePreviews([]);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingProduct(null);
    setEditSelectedImages([]);
    setEditImagePreviews([]);
  };

  // Handle product deletion
  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/admin/products?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      alert("Product deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 lg:mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold">Products Management</h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-black text-white hover:bg-gray-800 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>{showAddForm ? "Cancel" : "Add Product"}</span>
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-4 lg:p-6 shadow mb-6 lg:mb-8 space-y-4"
        >
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              rows={3}
              className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
            />
          </div>

          {/* Price   */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Old Price (₦)
              </label>
              <input
                type="number"
                name="oldPrice"
                placeholder="Optional: 15000"
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Price (₦) *
              </label>
              <input
                type="number"
                name="price"
                placeholder="10000"
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
                required
              />
            </div>
          </div>

          {/* Stock  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (% )
              </label>
              <input
                type="number"
                name="discountPercentage"
                placeholder="Optional: 150"
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                placeholder="10000"
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="categoryId"
              className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
              required
            >
              <option value="">Select Category</option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images *
            </label>

            {/* File Input */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="product-images"
              />
              <label
                htmlFor="product-images"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <Upload className="text-gray-400" size={32} />
                <div>
                  <span className="text-blue-600 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG up to 10MB each
                </p>
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Selected Images ({selectedImages.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                        {selectedImages[index]?.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
            disabled={selectedImages.length === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <Plus size={20} />
                <span>Add Product</span>
              </>
            )}
          </Button>

          {selectedImages.length === 0 && (
            <p className="text-sm text-red-600 text-center">
              Please upload at least one product image
            </p>
          )}
        </form>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button
                onClick={closeEditModal}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingProduct.name}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingProduct.description || ""}
                  placeholder="Enter product description"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
                />
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₦) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingProduct.price}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    defaultValue={editingProduct.stock}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="categoryId"
                  defaultValue={editingProduct.categoryId}
                  className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Existing Images */}
              {editingProduct.imageUrls &&
                editingProduct.imageUrls.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing Images ({editingProduct.imageUrls.length})
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {editingProduct.imageUrls.map(
                        (url: string, index: number) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Existing ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Add New Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add New Images
                </label>

                {/* File Input */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleEditImageSelect}
                    className="hidden"
                    id="edit-product-images"
                  />
                  <label
                    htmlFor="edit-product-images"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    <Upload className="text-gray-400" size={32} />
                    <div>
                      <span className="text-blue-600 font-medium">
                        Click to upload
                      </span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG up to 10MB each
                    </p>
                  </label>
                </div>

                {/* New Image Previews */}
                {editImagePreviews.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      New Images ({editSelectedImages.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {editImagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`New Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeEditImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                            {editSelectedImages[index]?.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={
                    isEditing ||
                    (editingProduct.imageUrls.length === 0 &&
                      editSelectedImages.length === 0)
                  }
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {isEditing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    "Update Product"
                  )}
                </Button>
              </div>

              {editingProduct.imageUrls.length === 0 &&
                editSelectedImages.length === 0 && (
                  <p className="text-sm text-red-600 text-center">
                    At least one product image is required
                  </p>
                )}
            </form>
          </div>
        </div>
      )}

      {/* Loading State */}
      {productsLoading && (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* Products List - Mobile View */}
      {!productsLoading && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="lg:hidden divide-y">
            {products.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">Add your first product to get started</p>
              </div>
            ) : (
              products.map((item) => (
                <div key={item.id} className="p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    {/* Product Image */}
                    {item.imageUrls?.[0] && (
                      <img
                        src={item.imageUrls[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="font-medium capitalize">
                          {item.name}
                        </div>
                        <span className="px-2 capitalize py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {item.category.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>₦{item.price}</span>
                        <span>Stock: {item.stock}</span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex items-center space-x-1 text-blue-600 text-sm"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center space-x-1 text-red-600 text-sm"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Products List - Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            {products.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-xl font-medium">No products found</p>
                <p className="text-sm">Add your first product to get started</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left py-4 px-6">Image</th>
                    <th className="text-left py-4 px-6">Product Name</th>
                    <th className="text-left py-4 px-6">Price</th>
                    <th className="text-left py-4 px-6">Stock</th>
                    <th className="text-left py-4 px-6">Category</th>
                    <th className="text-center py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        {item.imageUrls?.[0] && (
                          <img
                            src={item.imageUrls[0]}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        )}
                      </td>
                      <td className="py-4 px-6 font-medium capitalize">
                        {item.name}
                      </td>
                      <td className="py-4 px-6">₦{item.price}</td>
                      <td className="py-4 px-6">{item.stock}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs capitalize">
                          {item.category.name}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoriesTab() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");

  // Edit modal states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  const {
    categories,
    CreateCategory,
    deleteCategory,
    editCategory,
    categoriesLoading,
    isLoading,
  } = useProducts();
  const formData = { name };

  const openEditModal = (cat: any) => {
    setEditingId(cat.id);
    setEditedName(cat.name);
  };

  const closeEditModal = () => {
    setEditingId(null);
    setEditedName("");
  };

  const handleSaveEdit = () => {
    editCategory(editingId!, { name: editedName });
    closeEditModal();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 lg:mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold">
          Categories Management
        </h2>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-black text-white hover:bg-gray-800 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>{showAddForm ? "Cancel" : "Add Category"}</span>
        </Button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg p-4 lg:p-6 shadow mb-6 lg:mb-8 space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            className="w-full px-4 py-2 border rounded-lg text-sm lg:text-base"
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            onClick={() => CreateCategory(formData)}
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={isLoading}
          >
            Add Category
          </Button>
        </div>
      )}

      {categoriesLoading && (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* MOBILE VIEW */}
        <div className="lg:hidden divide-y">
          {categories?.map((cat) => (
            <div key={cat.id} className="p-4 space-y-3">
              <div className="font-medium capitalize">{cat.name}</div>
              <div className="text-sm text-gray-600">Slug: {cat.name}</div>

              <div className="flex justify-between items-center">
                <span className="text-sm">{cat.products.length} products</span>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left py-4 px-6">Category Name</th>
                <th className="text-left py-4 px-6">Slug</th>
                <th className="text-left py-4 px-6">Products</th>
                <th className="text-center py-4 px-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">{cat.name}</td>
                  <td className="py-4 px-6">{cat.name}</td>
                  <td className="py-4 px-6">{cat.products.length}</td>

                  <td className="py-4 px-6 text-center space-x-2">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Category</h2>
              <button onClick={closeEditModal}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter new category name"
            />

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrdersTab() {
  const STATUS_OPTIONS = ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await handleGet("admin/orders");
      const data = await response.json();

      const sorted = data.data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setOrders(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await handlePut(`admin/orders/${id}`, { deliveryStatus: status });
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((o) => o.deliveryStatus === filter);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Orders Management</h2>

      {/* FILTER */}
      <div className="mb-4 flex gap-3 items-center">
        <span className="font-medium text-sm">Filter:</span>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="ALL">All</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-4 px-6">Order ID</th>
              <th className="text-left py-4 px-6">Customer</th>
              <th className="text-left py-4 px-6">Amount</th>
              <th className="text-left py-4 px-6">Status</th>
              <th className="text-center py-4 px-6">Order Info</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* ID */}
                <td className="py-4 px-6 font-medium">
                  #{item.id.slice(0, 6)}
                </td>

                {/* Customer */}
                <td className="py-4 px-6 capitalize">{item.user.name}</td>

                {/* Amount */}
                <td className="py-4 px-6 font-semibold text-gray-800">
                  ₦{item.totalAmount.toLocaleString()}
                </td>

                {/* STATUS DROPDOWN */}
                <td className="py-4 px-6">
                  <select
                    value={item.deliveryStatus}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    className="border px-2 py-1 rounded text-sm"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                {/* VIEW BUTTON */}
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => setSelectedOrder(item)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td className="py-6 px-6 text-center text-gray-500" colSpan={5}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ----------------------- MODAL ------------------------ */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg overflow-hidden animate-fadeIn">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">
                Order Details – #{selectedOrder.id.slice(0, 8)}
              </h3>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5 text-gray-700 hover:text-black" />
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="font-semibold mb-1">Customer</h4>
                <p className="capitalize text-sm">
                  Name: {selectedOrder.user.name}
                </p>
                <p className="text-xs text-gray-500">
                  Email: {selectedOrder.user.email}
                </p>
                <p className="text-xs text-gray-500">
                  Phone: {selectedOrder.user.phone}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Order Type</h4>
                <p className="text-sm">
                  {selectedOrder.deliveryType === "pickup"
                    ? "Pickup at store"
                    : "Home Delivery"}
                </p>
              </div>

              {selectedOrder.deliveryType === "delivery" && (
                <div>
                  <h4 className="font-semibold mb-1">Delivery Address</h4>
                  <p className="text-sm">{selectedOrder.address}</p>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 p-2 rounded flex justify-between"
                    >
                      <div>
                        <p className="font-medium text-sm capitalize">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        ₦{(item.unitPrice * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3">
                <h4 className="font-semibold mb-1">Total Amount</h4>
                <p className="text-lg font-bold">
                  ₦{selectedOrder.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
