import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 text-white px-4 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4",
        typeStyles[type]
      )}
    >
      {message}
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
    type: "success" | "error" | "info" = "info"
  ) => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      {
        message,
        type,
        duration: 3000,
        onClose: () => {
          setToasts((prev) => prev.filter((t) => t.onClose !== onClose));
        },
      } as ToastProps,
    ]);
  };

  return { toasts, setToasts, addToast };
};
