"use client";

import { use, useState, useEffect } from "react";
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
    description: "Studio-quality sound with active noise cancellation. Professional-grade wireless headphones with 40-hour battery life, premium materials, and seamless Bluetooth connectivity.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    category: "electronics",
    stock: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "2": {
    id: "2",
    name: "Professional Camera",
    description: "4K/60fps video with advanced stabilization. Capture stunning visuals with professional-grade optics, weather-sealed body, and integrated wireless connectivity.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop",
    category: "electronics",
    stock: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "3": {
    id: "3",
    name: "Smart Watch Pro",
    description: "Advanced health metrics and seamless connectivity. Monitor your fitness, receive notifications, and manage your day with always-on display and all-day battery.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    category: "electronics",
    stock: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "4": {
    id: "4",
    name: "Mechanical Keyboard",
    description: "Premium switches for the ultimate typing experience. Custom mechanical switches, aluminum frame, programmable keys, and RGB backlighting.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1587829191301-6e2174e9c4da?w=800&h=800&fit=crop",
    category: "accessories",
    stock: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "5": {
    id: "5",
    name: "Luxury Watch",
    description: "Timeless elegance with precision craftsmanship. Swiss-made movement, sapphire crystal, water-resistant design, and genuine leather strap.",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1523170235482-f1e5dfe493d0?w=800&h=800&fit=crop",
    category: "accessories",
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "6": {
    id: "6",
    name: "Premium Backpack",
    description: "Sophisticated design meets functional durability. Weather-resistant materials, multiple compartments, laptop sleeve, and ergonomic design.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
    category: "lifestyle",
    stock: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "7": {
    id: "7",
    name: "Wireless Charger",
    description: "Fast charging with elegant minimalist design. 15W fast charging, works with all Qi-enabled devices, non-slip surface, and premium materials.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1591580621749-6d82cd6faa3e?w=800&h=800&fit=crop",
    category: "accessories",
    stock: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "8": {
    id: "8",
    name: "Premium Sunglasses",
    description: "UV protection with luxury frame design. 100% UV protection, polarized lenses, lightweight titanium frame, and comes with premium case.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
    category: "lifestyle",
    stock: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const p = SAMPLE_PRODUCTS[id];
    if (p) {
      setProduct(p);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <Loader className="h-96" />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
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
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="text-primary hover:text-primary/90">
            Products
          </Link>
          <span className="text-text-secondary mx-2">/</span>
          <span className="text-text-secondary">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 bg-surface rounded-lg overflow-hidden aspect-square flex items-center justify-center">
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
                      ? "border-primary"
                      : "border-border"
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
                  <h1 className="text-3xl font-bold text-text-primary mb-2">
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
                    <span className="text-sm text-text-secondary">(0 reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-4xl font-bold text-text-primary mb-4">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Stock */}
            <div className="mb-6 p-4 bg-surface-raised rounded-lg">
              <p className="text-sm font-semibold text-text-primary">
                {product.stock > 0 ? (
                  <>
                    <span className="text-success">In Stock</span>
                    {product.stock < 10 && (
                      <span className="ml-2 text-text-secondary">
                        ({product.stock} left)
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-destructive">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Description
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-text-secondary">
                <li>✓ Premium quality materials</li>
                <li>✓ Extended warranty coverage</li>
                <li>✓ Free shipping worldwide</li>
                <li>✓ 30-day money-back guarantee</li>
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-text-primary">
                  Quantity:
                </label>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-surface"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="px-4 py-2 hover:bg-surface"
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
