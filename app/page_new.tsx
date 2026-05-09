"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { Loader } from "@/components/ui/Loading";

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality sound with noise cancellation",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "electronics",
    stock: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Professional Camera",
    description: "4K video recording with AI features",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    category: "electronics",
    stock: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Smart Watch Pro",
    description: "Track your fitness with style",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "electronics",
    stock: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    description: "Premium typing experience for professionals",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1587829191301-6e2174e9c4da?w=400&h=400&fit=crop",
    category: "accessories",
    stock: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts(FEATURED_PRODUCTS);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to ProStore
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover premium products with exceptional quality and service. Shop with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Shop Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-yellow-50 py-8 border-b border-yellow-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-semibold text-gray-900">
            🎉 Free Shipping on orders over $50! Limited time offer.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our carefully curated selection of premium products.
            </p>
          </div>

          {loading ? (
            <Loader className="h-64" />
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Electronics",
                description: "Latest gadgets and devices",
                icon: "🔌",
              },
              {
                name: "Accessories",
                description: "Enhance your experience",
                icon: "⌚",
              },
              {
                name: "Lifestyle",
                description: "For your daily needs",
                icon: "🎒",
              },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-8 text-center cursor-pointer"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Create an account to track your orders and enjoy exclusive deals.
          </p>
          <Link href="/auth/signup">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
