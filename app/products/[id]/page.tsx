"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Loader } from "@/components/ui/Loading";
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Sample products for detail page
const SAMPLE_PRODUCTS: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Professional-grade wireless headphones with active noise cancellation, 40-hour battery life, and premium sound quality.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    category: "electronics",
    stock: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const p = SAMPLE_PRODUCTS[params.id];
    if (p) {
      setProduct(p);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <Loader className="h-96" />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <Link href="/products">
            <Button variant="primary">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart(product.id, quantity, product.price);
    setQuantity(1);
  };

  const handleShareClick = () => {
    {
      copy(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  const copy = (t: string) => {
    navigator.clipboard.writeText(t);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            Products
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 justify-center">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={images[index]}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(0 reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-4xl font-bold text-gray-900 mb-4">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Stock */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">
                {product.stock > 0 ? (
                  <>
                    <span className="text-green-600">In Stock</span>
                    {product.stock < 10 && (
                      <span className="ml-2 text-gray-600">
                        ({product.stock} left)
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Premium quality materials</li>
                <li>✓ Extended warranty coverage</li>
                <li>✓ Free shipping worldwide</li>
                <li>✓ 30-day money-back guarantee</li>
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full py-3 flex items-center justify-center gap-2 text-lg"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                className="w-full py-3"
                onClick={handleShareClick}
              >
                Share this product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
