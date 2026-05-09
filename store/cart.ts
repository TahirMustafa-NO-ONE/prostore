import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Cart } from "@/types";

interface CartStore {
  cart: Cart;
  addToCart: (productId: string, quantity: number, price: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
      },
      addToCart: (productId, quantity, price) =>
        set((state) => {
          const existingItem = state.cart.items.find(
            (item) => item.productId === productId
          );

          let items: CartItem[];
          if (existingItem) {
            items = state.cart.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            items = [...state.cart.items, { productId, quantity, price }];
          }

          const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            cart: { items, total },
          };
        }),

      removeFromCart: (productId) =>
        set((state) => {
          const items = state.cart.items.filter(
            (item) => item.productId !== productId
          );
          const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          return { cart: { items, total } };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          const items =
            quantity <= 0
              ? state.cart.items.filter((item) => item.productId !== productId)
              : state.cart.items.map((item) =>
                  item.productId === productId
                    ? { ...item, quantity }
                    : item
                );

          const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return { cart: { items, total } };
        }),

      clearCart: () =>
        set({
          cart: {
            items: [],
            total: 0,
          },
        }),

      getTotal: () => {
        return get().cart.total;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
