"use client";

import React from "react";
import { CartItem as CartItemType, Product } from "@/types";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  product?: Product;
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200">
      {/* Product Image Placeholder */}
      <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0" />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg">Product {item.productId}</h3>
        <p className="text-gray-600 text-sm mt-1">
          {formatPrice(item.price)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updateQuantity(item.productId, item.quantity - 1)
            }
          >
            <Minus size={16} />
          </Button>
          <span className="w-8 text-center font-semibold">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updateQuantity(item.productId, item.quantity + 1)
            }
          >
            <Plus size={16} />
          </Button>
          <span className="ml-auto font-semibold">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        onClick={() => removeFromCart(item.productId)}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 size={20} />
      </Button>
    </div>
  );
}
