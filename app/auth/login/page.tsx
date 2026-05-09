'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/store/auth';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
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
              <LogIn size={24} className="text-primary" />
            </div>
          </div>
          <CardTitle className="font-display text-3xl">Welcome Back</CardTitle>
          <p className="text-text-secondary font-body text-sm mt-2">
            Sign in to your ProStore account
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs font-body">
              <label className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text-primary">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-surface-raised border border-border rounded cursor-pointer"
                />
                Remember me
              </label>
              <Link
                href="#"
                className="text-primary hover:text-primary/90 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
            <p className="text-xs font-semibold text-text-secondary mb-2 font-body">
              Demo Account:
            </p>
            <p className="text-xs text-text-secondary font-mono">
              user@example.com / password123
            </p>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-text-secondary font-body">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-primary hover:text-primary/90 font-semibold transition-colors"
            >
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
