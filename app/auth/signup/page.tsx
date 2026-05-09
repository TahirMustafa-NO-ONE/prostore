'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/store/auth';
import { UserPlus, Check } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      setToken(data.token);
      setUser(data.user);
      router.push('/');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 animate-in">
        <CardHeader className="text-center border-b border-border">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <UserPlus size={24} className="text-primary" />
            </div>
          </div>
          <CardTitle className="font-display text-3xl">Join ProStore</CardTitle>
          <p className="text-text-secondary font-body text-sm mt-2">
            Create your account to start shopping
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                Full Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-text-secondary mt-1 font-body">
                At least 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2 font-body">
                Confirm Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer text-xs font-body text-text-secondary hover:text-text-primary">
              <input
                type="checkbox"
                className="w-4 h-4 bg-surface-raised border border-border rounded cursor-pointer mt-0.5"
                required
              />
              <span>
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary/90">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-primary/90">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Sign Up Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-text-secondary font-body">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/90 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-border text-xs text-text-secondary font-body space-y-2">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-success flex-shrink-0" />
              Free shipping on orders $50+
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-success flex-shrink-0" />
              Exclusive member offers
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-success flex-shrink-0" />
              30-day returns guaranteed
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
