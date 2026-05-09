'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-wide py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-display text-2xl font-bold text-primary mb-4 tracking-wide">
              PROSTORE
            </h3>
            <p className="text-text-secondary font-body text-sm leading-relaxed">
              Discover expertly curated products crafted for the discerning. Premium quality, exceptional service.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <MapPin size={16} className="text-primary" />
                <span>123 Luxury Ave, City, Country</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Phone size={16} className="text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Mail size={16} className="text-primary" />
                <a href="mailto:hello@prostore.com" className="hover:text-primary transition-colors">
                  hello@prostore.com
                </a>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display font-semibold mb-6 text-text-primary">Shop</h4>
            <ul className="space-y-3">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Sale'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/products"
                      className="text-text-secondary hover:text-primary font-body text-sm transition-colors link-hover"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-display font-semibold mb-6 text-text-primary">Account</h4>
            <ul className="space-y-3">
              {['My Orders', 'Wishlist', 'Settings', 'Help Center'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-text-secondary hover:text-primary font-body text-sm transition-colors link-hover"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-display font-semibold mb-6 text-text-primary">Newsletter</h4>
            <p className="text-text-secondary font-body text-sm mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-surface-raised border border-border rounded-md px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button className="bg-primary text-background hover:bg-primary/90 font-semibold text-sm py-2.5 rounded-md transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-text-secondary font-body text-sm">
            &copy; {year} ProStore. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-text-secondary hover:text-primary font-body text-sm transition-colors link-hover"
              >
                {social}
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm">
            {['Privacy', 'Terms', 'Cookies'].map((legal) => (
              <a
                key={legal}
                href="#"
                className="text-text-secondary hover:text-primary font-body transition-colors link-hover"
              >
                {legal}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Accent Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  );
}
