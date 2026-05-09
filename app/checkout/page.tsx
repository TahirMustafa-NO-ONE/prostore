'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';
import { useCart } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';
import { Lock, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    email: user?.email || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
    if (cart.items.length === 0) {
      router.push('/cart');
    }
  }, [user, cart, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.items,
          shippingAddress: formData,
          paymentMethod: 'card',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Checkout failed');
        return;
      }

      clearCart();
      router.push(`/checkout/success?orderId=${data.data.id}`);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = cart.total + cart.total * 0.08;

  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-text-secondary font-body">
            Secure checkout with free shipping on this order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form - Left Column */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2">
                  <Truck size={24} className="text-primary" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {error && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      className="bg-surface-raised/50"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                      Street Address
                    </label>
                    <Input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="123 Luxury Avenue"
                      required
                    />
                  </div>

                  {/* City & State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                        City
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                        State/Province
                      </label>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="NY"
                        required
                      />
                    </div>
                  </div>

                  {/* ZIP & Country */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                        ZIP/Postal Code
                      </label>
                      <Input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="10001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                        Country
                      </label>
                      <Input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="United States"
                        required
                      />
                    </div>
                  </div>

                  {/* Security Note */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex items-start gap-3">
                      <Lock size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-text-primary font-body">
                        <strong>Demo Mode:</strong> This is a secure demo environment. No real payment will be processed.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={loading}
                      isLoading={loading}
                    >
                      {loading ? 'Processing Order...' : 'Place Order'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary - Right Column (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-display">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {cart.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between items-start pb-3 border-b border-border/50"
                      >
                        <div>
                          <p className="text-sm font-body text-text-primary">
                            Item {item.productId}
                          </p>
                          <p className="text-xs text-text-secondary font-body">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-mono font-semibold text-text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 border-t border-border pt-6">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-text-secondary">Subtotal</span>
                      <span className="text-text-primary">
                        {formatPrice(cart.total)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-text-secondary">Tax (8%)</span>
                      <span className="text-text-primary">
                        {formatPrice(cart.total * 0.08)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-text-secondary">Shipping</span>
                      <span className="text-success font-semibold">Free</span>
                    </div>

                    {/* Final Total */}
                    <div className="border-t border-border pt-3 mt-3 flex justify-between">
                      <span className="font-display font-semibold text-text-primary">
                        Total
                      </span>
                      <span className="font-mono font-bold text-lg text-primary">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-border space-y-2 text-xs text-text-secondary font-body">
                    <p>✓ Secure checkout</p>
                    <p>✓ SSL encrypted</p>
                    <p>✓ Free returns within 30 days</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
