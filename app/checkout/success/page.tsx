"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-600" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          {orderId && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono font-semibold text-gray-900 break-all">
                {orderId}
              </p>
            </div>
          )}

          <p className="text-sm text-gray-600">
            A confirmation email has been sent to your email address.
          </p>

          <div className="space-y-2 pt-4">
            <Link href="/dashboard" className="block">
              <Button variant="primary" className="w-full">
                View Order Status
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-gray-50" />}>
      <SuccessContent />
    </Suspense>
  );
}
