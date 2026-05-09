'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id, 1, product.price);
    onAddToCart?.(product.id);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden h-full card-hover cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-surface-raised">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Stock Status Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
              <span className="text-text-primary font-display font-semibold text-lg">
                Out of Stock
              </span>
            </div>
          )}

          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-4 left-4 z-20">
              <span className="badge badge-primary text-xs font-semibold">
                {product.category || 'New'}
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-4 right-4 z-20 p-2 bg-surface/80 backdrop-blur hover:bg-surface rounded-lg transition-all duration-200 hover:scale-110"
          >
            <Heart
              size={18}
              className={`transition-colors ${
                isWishlisted
                  ? 'fill-primary text-primary'
                  : 'text-text-secondary hover:text-primary'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <CardContent className="p-5 flex flex-col gap-3 h-full">
          {/* Product Name */}
          <h3 className="font-display font-semibold text-base text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating (placeholder) */}
          <div className="flex items-center gap-1 text-xs">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-text-secondary">(0 reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-auto">
            <span className="text-lg font-mono font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Add to Cart Button - Visible on Hover */}
          <Button
            variant={product.stock === 0 ? 'outline' : 'primary'}
            size="md"
            className="w-full mt-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-200"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            {product.stock === 0 ? 'Unavailable' : 'Add to Cart'}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
