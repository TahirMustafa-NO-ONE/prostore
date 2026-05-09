'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/cart';
import { useAuth } from '@/store/auth';
import { Button } from '@/components/ui/Button';
import {
  ShoppingCart,
  LogOut,
  Menu,
  X,
  Search,
  User,
} from 'lucide-react';

export function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="container-wide py-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="text-2xl font-display font-bold text-primary tracking-widest">
              PROSTORE
            </span>
          </Link>

          {/* Desktop Navigation Center */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link
              href="/products"
              className="relative text-text-primary font-body font-medium text-sm link-hover"
            >
              Products
            </Link>
            <Link
              href="/products?category=all"
              className="relative text-text-primary font-body font-medium text-sm link-hover"
            >
              Categories
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button className="p-2 hover:bg-surface rounded-md transition-colors">
              <Search size={20} className="text-text-primary" />
            </button>

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="relative p-2 hover:bg-surface rounded-md transition-colors">
              <ShoppingCart size={20} className="text-text-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-background text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-soft">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <User size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary font-body">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="hidden sm:inline-flex gap-2"
                >
                  <LogOut size={16} />
                </Button>
              </>
            ) : (
              <div className="hidden sm:flex gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
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
              className="md:hidden p-2 hover:bg-surface rounded-md transition-colors"
            >
              {isOpen ? (
                <X size={24} className="text-text-primary" />
              ) : (
                <Menu size={24} className="text-text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-3 animate-slide-in border-t border-border pt-4">
            <Link
              href="/products"
              className="block px-3 py-2 text-text-primary hover:bg-surface rounded-md font-body transition-colors"
            >
              Products
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-text-primary hover:bg-surface rounded-md font-body transition-colors"
                >
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-text-primary hover:bg-surface rounded-md font-body transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="w-full justify-start"
                >
                  Logout
                </Button>
              </>
            )}
            {!user && (
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Link href="/auth/login" className="w-full">
                  <Button variant="outline" size="md" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup" className="w-full">
                  <Button variant="primary" size="md" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Thin gold border line at bottom for elegance */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
}
