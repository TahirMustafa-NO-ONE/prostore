'use client';

import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={`
        flex h-11 w-full bg-surface-raised border border-border
        rounded-md px-4 py-2.5 text-base text-text-primary
        font-body
        placeholder:text-text-secondary
        focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30
        disabled:cursor-not-allowed disabled:opacity-50
        transition-all duration-200
        ${className}
      `}
      {...props}
    />
  )
);

Input.displayName = 'Input';

export { Input };
