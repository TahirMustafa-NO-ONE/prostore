'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const variantClasses = {
  primary:
    'bg-primary text-background hover:bg-primary/90 active:scale-95 font-semibold focus-ring',
  secondary:
    'bg-surface-raised text-primary hover:bg-surface border border-primary active:scale-95 focus-ring',
  outline:
    'border border-border text-text-primary hover:bg-surface-raised active:scale-95 focus-ring',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-surface/50 active:scale-95 focus-ring',
  destructive:
    'bg-destructive text-white hover:bg-destructive/90 active:scale-95 font-semibold focus-ring',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-md h-9',
  md: 'px-4 py-2.5 text-base rounded-md h-11',
  lg: 'px-6 py-3 text-lg rounded-lg h-12',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center
          whitespace-nowrap font-body font-medium
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
