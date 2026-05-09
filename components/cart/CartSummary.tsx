"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CartItem } from "./CartItem";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

export function CartSummary() {
  const { cart } = useCart();

  if (cart.items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cart Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/products">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {cart.items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span>
                Product {item.productId} x{item.quantity}
              </span>
              <span className="font-semibold">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatPrice(cart.total)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax</span>
            <span>{formatPrice(cart.total * 0.08)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(cart.total + cart.total * 0.08)}</span>
          </div>
        </div>

        <Link href="/checkout" className="w-full">
          <Button variant="primary" className="w-full">
            Proceed to Checkout
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
