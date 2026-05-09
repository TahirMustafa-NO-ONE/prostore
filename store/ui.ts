import { create } from "zustand";

interface UiStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
}

export const useUi = create<UiStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  isCartOpen: false,
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}));
