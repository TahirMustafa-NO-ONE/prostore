'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/store/cart';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <ShoppingBag size={36} className="text-primary" />
            Shopping Cart
          </h1>
          <p className="text-text-secondary font-body">
            {cart.items.length} item{cart.items.length !== 1 ? 's' : ''} • Free
            shipping on orders over $50
          </p>
        </div>

        {cart.items.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <div className="mb-6">
              <ShoppingBag
                size={64}
                className="text-text-secondary/40 mx-auto"
              />
            </div>
            <h2 className="font-display text-3xl font-semibold text-text-primary mb-3">
              Your cart is empty
            </h2>
            <p className="text-text-secondary font-body mb-8 text-center max-w-md">
              Discover our curated collection and add items to get started.
            </p>
            <Link href="/products">
              <Button variant="primary" size="lg">
                Explore Products
              </Button>
            </Link>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items Container */}
              <div className="bg-surface border border-border rounded-lg overflow-hidden divide-y divide-border">
                {cart.items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>

              {/* Continue Shopping Button */}
              <Link href="/products">
                <Button
                  variant="ghost"
                  className="group flex items-center gap-2"
                >
                  <ArrowLeft
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Summary - Right Column (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
