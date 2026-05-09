'use client';

import React from 'react';

interface LoaderProps {
  className?: string;
}

export function Loader({ className = '' }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="animate-spin">
        <div className="h-8 w-8 rounded-full border-4 border-border border-t-primary" />
      </div>
    </div>
  );
}

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={`animate-spin ${className}`}>
      <div
        className={`
          rounded-full border-2 border-border border-t-primary
          ${sizeClasses[size]}
        `}
      />
    </div>
  );
}

// Skeleton loaders for placeholders
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="skeleton skeleton-image h-48 w-full mb-4" />
      <div className="skeleton skeleton-text mb-2" />
      <div className="skeleton skeleton-text w-2/3" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton skeleton-text" />
      ))}
    </div>
  );
}
