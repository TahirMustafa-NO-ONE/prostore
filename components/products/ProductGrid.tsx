'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
}

export function ProductGrid({
  products,
  onAddToCart,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary font-body text-lg">
          No products found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in">
      {products.map((product, index) => (
        <div
          key={product.id}
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
          />
        </div>
      ))}
    </div>
  );
}
