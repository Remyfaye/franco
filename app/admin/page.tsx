"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-black text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Zaron Admin</h1>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg">Logout</button>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
          {[
            { id: "overview", label: "Dashboard" },
            { id: "products", label: "Products" },
            { id: "orders", label: "Orders" },
            { id: "categories", label: "Categories" },
            { id: "logs", label: "Audit Logs" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id ? "bg-black" : "hover:bg-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "categories" && <CategoriesTab />}
          {activeTab === "logs" && <AuditLogsTab />}
        </main>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow">
          <p className="text-gray-600 text-sm">Total Products</p>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-3xl font-bold">5,678</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <p className="text-gray-600 text-sm">Revenue</p>
          <p className="text-3xl font-bold">₦2.5M</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <p className="text-gray-600 text-sm">Users</p>
          <p className="text-3xl font-bold">890</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3">#ORD-{1000 + i}</td>
                <td className="py-3">Customer {i}</td>
                <td className="py-3">₦{(Math.random() * 100000).toFixed(0)}</td>
                <td className="py-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProductsTab() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Products Management</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-black text-white hover:bg-gray-800">
          {showAddForm ? "Cancel" : "+ Add Product"}
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg p-6 shadow mb-8 space-y-4">
          <input type="text" placeholder="Product Name" className="w-full px-4 py-2 border rounded-lg" />
          <textarea placeholder="Description" rows={3} className="w-full px-4 py-2 border rounded-lg" />
          <input type="number" placeholder="Price (in kobo)" className="w-full px-4 py-2 border rounded-lg" />
          <input type="number" placeholder="Stock" className="w-full px-4 py-2 border rounded-lg" />
          <select className="w-full px-4 py-2 border rounded-lg">
            <option>Select Category</option>
            <option>Makeup</option>
            <option>Skincare</option>
            <option>Hair Care</option>
          </select>
          <Button className="w-full bg-black text-white hover:bg-gray-800">Add Product</Button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-4 px-6">Product Name</th>
              <th className="text-left py-4 px-6">Price</th>
              <th className="text-left py-4 px-6">Stock</th>
              <th className="text-left py-4 px-6">Category</th>
              <th className="text-center py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">Product {i}</td>
                <td className="py-4 px-6">₦{(Math.random() * 5000).toFixed(0)}</td>
                <td className="py-4 px-6">{Math.floor(Math.random() * 100)}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs">Makeup</span>
                </td>
                <td className="py-4 px-6 text-center space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrdersTab() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Orders Management</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-4 px-6">Order ID</th>
              <th className="text-left py-4 px-6">Customer</th>
              <th className="text-left py-4 px-6">Amount</th>
              <th className="text-left py-4 px-6">Payment Status</th>
              <th className="text-left py-4 px-6">Delivery Status</th>
              <th className="text-center py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">#ORD-{2000 + i}</td>
                <td className="py-4 px-6">Customer {i}</td>
                <td className="py-4 px-6">₦{(Math.random() * 500000).toFixed(0)}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs">Paid</span>
                </td>
                <td className="py-4 px-6">
                  <select className="px-2 py-1 border rounded text-xs">
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
                <td className="py-4 px-6 text-center">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CategoriesTab() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Categories Management</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-black text-white hover:bg-gray-800">
          {showAddForm ? "Cancel" : "+ Add Category"}
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg p-6 shadow mb-8 space-y-4">
          <input type="text" placeholder="Category Name" className="w-full px-4 py-2 border rounded-lg" />
          <input type="text" placeholder="Category Slug" className="w-full px-4 py-2 border rounded-lg" />
          <Button className="w-full bg-black text-white hover:bg-gray-800">Add Category</Button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
            {["Makeup", "Skincare", "Hair Care", "Accessories"].map((cat, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">{cat}</td>
                <td className="py-4 px-6">{cat.toLowerCase().replace(" ", "-")}</td>
                <td className="py-4 px-6">{Math.floor(Math.random() * 50) + 10}</td>
                <td className="py-4 px-6 text-center space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AuditLogsTab() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Audit Logs</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-4 px-6">Timestamp</th>
              <th className="text-left py-4 px-6">Admin</th>
              <th className="text-left py-4 px-6">Action</th>
              <th className="text-left py-4 px-6">Entity</th>
              <th className="text-left py-4 px-6">Details</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 text-xs">
                  2024-01-{10 + i} 14:3{0 + i}
                </td>
                <td className="py-4 px-6">admin@zaron.com</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {["Updated", "Created", "Deleted"][i % 3]}
                  </span>
                </td>
                <td className="py-4 px-6">Product</td>
                <td className="py-4 px-6 text-gray-600">Price changed from ₦5000 to ₦4500</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
