import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Product } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Studio-quality sound with active noise cancellation',
    price: 199.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'electronics',
    stock: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Professional Camera',
    description: '4K/60fps video with advanced stabilization',
    price: 899.99,
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    category: 'electronics',
    stock: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Smart Watch Pro',
    description: 'Advanced health metrics and seamless connectivity',
    price: 349.99,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'electronics',
    stock: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'Premium switches for the ultimate typing experience',
    price: 179.99,
    image:
      'https://images.unsplash.com/photo-1587829191301-6e2174e9c4da?w=400&h=400&fit=crop',
    category: 'accessories',
    stock: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Luxury Watch',
    description: 'Timeless elegance with precision craftsmanship',
    price: 549.99,
    image:
      'https://images.unsplash.com/photo-1523170235482-f1e5dfe493d0?w=400&h=400&fit=crop',
    category: 'accessories',
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Premium Backpack',
    description: 'Sophisticated design meets functional durability',
    price: 149.99,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'lifestyle',
    stock: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Wireless Charger',
    description: 'Fast charging with elegant minimalist design',
    price: 79.99,
    image:
      'https://images.unsplash.com/photo-1591580621749-6d82cd6faa3e?w=400&h=400&fit=crop',
    category: 'accessories',
    stock: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'Premium Sunglasses',
    description: 'UV protection with luxury frame design',
    price: 129.99,
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    category: 'lifestyle',
    stock: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const metadata = {
  title: 'ProStore - Luxury E-Commerce',
  description: 'Discover expertly curated products crafted for the discerning.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 mb-16 md:pt-32 md:mb-24">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-in">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={20} className="text-primary" />
                <span className="text-sm font-semibold text-primary font-body">
                  Premium Collection
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold text-text-primary leading-tight mb-6">
                Crafted for the Discerning
              </h1>

              <p className="text-lg text-text-secondary font-body leading-relaxed mb-8 max-w-xl">
                Discover expertly curated products that combine timeless elegance with modern functionality. Elevate your lifestyle with premium quality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto group"
                  >
                    Explore Collection
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View Lookbook
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border">
                {[
                  { label: 'Free Shipping', value: 'Orders $50+' },
                  { label: 'Premium Quality', value: 'Guaranteed' },
                  { label: 'Easy Returns', value: '30 Days' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-sm font-semibold text-primary">
                      {item.label}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block relative animate-in">
              <div className="relative w-full aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
                  alt="Featured Product"
                  className="rounded-lg shadow-xl w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-surface border-y border-border py-6 px-4">
        <div className="container-wide text-center">
          <p className="text-text-primary font-body font-semibold">
            ✨ Limited Time: Free shipping on orders over $50 | 20% off new
            arrivals
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-sm font-semibold text-primary font-body">
              CURATED SELECTION
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mt-2 mb-4">
              Featured Collection
            </h2>
            <p className="text-text-secondary font-body text-lg max-w-2xl mx-auto">
              Handpicked products selected for their exceptional quality and
              timeless appeal.
            </p>
          </div>

          <ProductGrid products={FEATURED_PRODUCTS.slice(0, 8)} />

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg" className="group">
                View All Products
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-sm font-semibold text-primary font-body">
              SHOP BY CATEGORY
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mt-2">
              Explore Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Electronics',
                description: 'Latest innovations in tech',
                image:
                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
              },
              {
                name: 'Accessories',
                description: 'Premium finishing touches',
                image:
                  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
              },
              {
                name: 'Lifestyle',
                description: 'Elevate your daily routine',
                image:
                  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
              },
            ].map((category) => (
              <Link href="/products" key={category.name}>
                <div className="group cursor-pointer overflow-hidden rounded-lg card-hover">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
                      {category.name}
                    </h3>
                    <p className="text-text-secondary font-body text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-raised p-12 md:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
                Join Our Community
              </h2>
              <p className="text-text-secondary font-body text-lg mb-8">
                Create an account to enjoy exclusive benefits, track your orders,
                and get early access to new collections.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full">
                    Create Account
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

