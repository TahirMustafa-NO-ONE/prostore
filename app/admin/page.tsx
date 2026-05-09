"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Product } from "@/types";
import { Loader } from "@/components/ui/Loading";
import { Trash2, Edit2, Plus, Package, TrendingUp, AlertCircle, LogOut } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchProducts();
  }, [user, router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API endpoint
    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProducts([...products, newProduct]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      stock: product.stock.toString(),
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  // Calculate stats
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
  const lowStockProducts = products.filter((p) => p.stock < 5).length;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-text-primary mb-2">
              Admin Panel
            </h1>
            <p className="text-text-secondary">
              Manage products, inventory, and store operations
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              className="flex items-center justify-center gap-2"
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
            >
              <Plus size={18} />
              Add Product
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => {
                const { logout } = useAuth();
                logout();
                router.push("/");
              }}
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {/* Total Products */}
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="pt-6 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-text-secondary text-sm mb-2">Total Products</p>
                  <p className="text-3xl font-bold text-primary">{totalProducts}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Package size={24} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Inventory Value */}
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="pt-6 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-text-secondary text-sm mb-2">Inventory Value</p>
                  <p className="text-3xl font-bold text-success">${(totalValue / 1000).toFixed(1)}K</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <TrendingUp size={24} className="text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card className={`relative overflow-hidden group ${lowStockProducts > 0 ? "border-destructive/30" : "border-success/30"}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${lowStockProducts > 0 ? "from-destructive/10" : "from-success/10"} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <CardContent className="pt-6 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-text-secondary text-sm mb-2">Low Stock Items</p>
                  <p className={`text-3xl font-bold ${lowStockProducts > 0 ? "text-destructive" : "text-success"}`}>
                    {lowStockProducts}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${lowStockProducts > 0 ? "bg-destructive/10" : "bg-success/10"}`}>
                  <AlertCircle size={24} className={lowStockProducts > 0 ? "text-destructive" : "text-success"} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Form / Edit Form */}
        {showForm && (
          <Card className="mb-12 border-primary/30">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 font-display">
                <Plus size={20} className="text-primary" />
                {editingId ? "Edit Product" : "Add New Product"}
              </CardTitle>
              <p className="text-text-secondary text-sm mt-2">Fill in all details to create or update a product</p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Product Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Premium Luxury Watch"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Category <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      placeholder="electronics"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Price (USD) <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      placeholder="999.99"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Stock Units <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleFormChange}
                      placeholder="10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Image URL <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    placeholder="https://images.example.com/product.jpg"
                    required
                  />
                  {formData.image && (
                    <div className="mt-3 p-3 bg-surface rounded-lg">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-40 object-cover rounded-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%231e1e1e' width='200' height='200'/%3E%3Ctext x='50%' y='50%' fill='%238a8a80' text-anchor='middle' dy='.3em'%3EImage Preview%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Premium handcrafted luxury product with premium materials..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <Button type="submit" variant="primary" className="flex-1">
                    {editingId ? "Update Product" : "Create Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => resetForm()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2 font-display">
              <Package size={20} className="text-primary" />
              Product Catalog ({totalProducts})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <Loader className="h-48" />
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-text-secondary/30 mb-4" />
                <p className="text-text-secondary mb-6">No products in catalog. Start by adding a new product.</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                >
                  Add First Product
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Product
                      </th>
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Category
                      </th>
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Price
                      </th>
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Stock
                      </th>
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Value
                      </th>
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-border hover:bg-surface/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-surface rounded-lg overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%231e1e1e' width='40' height='40'/%3E%3C/svg%3E";
                                }}
                              />
                            </div>
                            <div>
                              <p className="text-text-primary font-medium">{product.name}</p>
                              <p className="text-text-secondary text-xs">{product.id.slice(0, 8)}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-text-secondary">
                          <span className="px-2 py-1 bg-surface rounded text-xs">{product.category}</span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-primary">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <div className={`flex items-center gap-2 w-fit px-3 py-2 rounded-lg border ${
                            product.stock > 10
                              ? "bg-success/10 text-success border-success/20"
                              : product.stock > 0
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }`}>
                            <span className="text-xs font-semibold">{product.stock}</span>
                            <span className="text-xs">units</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-success">
                          ${(product.price * product.stock).toFixed(2)}
                        </td>
                        <td className="py-4 px-4 space-x-2 flex">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleEdit(product)}
                            title="Edit product"
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/40"
                            onClick={() => handleDelete(product.id)}
                            title="Delete product"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
