"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, LogOut, Menu, Home, Package, User } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">ProStore</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-black">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link href="/products" className="flex items-center gap-1 text-gray-700 hover:text-black">
              <Package size={18} />
              <span>Products</span>
            </Link>

            {user && (
              <Link href="/dashboard" className="flex items-center gap-1 text-gray-700 hover:text-black">
                <User size={18} />
                <span>Dashboard</span>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link href="/admin" className="text-gray-700 hover:text-black font-medium">
                Admin
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-600">
                  {user.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="hidden sm:flex space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Home
            </Link>
            <Link href="/products" className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Products
            </Link>
            {user && (
              <Link href="/dashboard" className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Dashboard
              </Link>
            )}
            {!user && (
              <>
                <Link href="/auth/login" className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Login
                </Link>
                <Link href="/auth/signup" className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
