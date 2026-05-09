'use client';

import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const typeConfig = {
  success: {
    bg: 'bg-success/10',
    border: 'border-l-4 border-l-success',
    text: 'text-success',
    icon: '✓',
  },
  error: {
    bg: 'bg-destructive/10',
    border: 'border-l-4 border-l-destructive',
    text: 'text-destructive',
    icon: '✕',
  },
  info: {
    bg: 'bg-primary/10',
    border: 'border-l-4 border-l-primary',
    text: 'text-primary',
    icon: 'ℹ',
  },
};

export function Toast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = typeConfig[type];

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        ${config.bg} ${config.border} border border-border
        rounded-lg px-4 py-3 shadow-lg
        animate-slide-in
        flex items-center gap-3
        text-text-primary font-body text-sm
      `}
    >
      <span className={config.text}>{config.icon}</span>
      <span>{message}</span>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastProps[];
  setToasts: (toasts: ToastProps[]) => void;
}

export function ToastContainer({ toasts, setToasts }: ToastContainerProps) {
  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          {...toast}
          onClose={() => {
            setToasts(toasts.filter((_, i) => i !== index));
          }}
        />
      ))}
    </div>
  );
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    const onClose = () => {
      setToasts((prev) => prev.filter((t) => t.message !== message));
    };
    
    setToasts((prev) => [
      ...prev,
      {
        message,
        type,
        duration: 3000,
        onClose,
      },
    ]);
  };

  return { toasts, setToasts, addToast };
};
