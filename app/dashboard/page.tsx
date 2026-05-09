"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatPrice, formatDate } from "@/lib/utils";
import { Loader } from "@/components/ui/Loading";
import { Order } from "@/types";
import { LogOut, Package, User, ShoppingBag, TrendingUp, ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    fetchOrders();
  }, [user, router]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  // Calculate stats
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const recentOrder = orders[orders.length - 1];
  const completedOrders = orders.filter((o) => o.status === "delivered").length;
  const pendingOrders = orders.filter((o) => o.status === "confirmed" || o.status === "pending").length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-success" />;
      case "pending":
        return <Clock size={16} className="text-primary" />;
      case "cancelled":
        return <AlertCircle size={16} className="text-destructive" />;
      default:
        return <Package size={16} className="text-text-secondary" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-primary/10 text-primary border-primary/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-text-secondary/10 text-text-secondary border-text-secondary/20";
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-text-primary mb-2">
              Welcome Back, {user.name.split(" ")[0]}
            </h1>
            <p className="text-text-secondary">
              {formatDate(new Date())} • Account: {user.role === "admin" ? "Administrator" : "Premium Member"}
            </p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Orders */}
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="pt-6 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-text-secondary text-sm mb-2">Total Orders</p>
                  <p className="text-3xl font-bold text-primary">{orders.length}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ShoppingBag size={24} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Spending */}
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="pt-6 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-text-secondary text-sm mb-2">Total Spending</p>
                  <p className="text-3xl font-bold text-success">{formatPrice(totalSpent)}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <TrendingUp size={24} className="text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Orders */}
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="pt-6 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-text-secondary text-sm mb-2">Completed</p>
                  <p className="text-3xl font-bold text-success">{completedOrders}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <CheckCircle size={24} className="text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Orders */}
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="pt-6 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-text-secondary text-sm mb-2">In Progress</p>
                  <p className="text-3xl font-bold text-primary">{pendingOrders}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock size={24} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Information */}
          <Card className="lg:col-span-1">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 font-display">
                <User size={20} className="text-primary" />
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div>
                <p className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-1">Full Name</p>
                <p className="text-text-primary font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-1">Email Address</p>
                <p className="text-text-primary font-medium break-all">{user.email}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-1">Account Type</p>
                <p className="text-primary font-medium capitalize">
                  {user.role === "admin" ? "Administrator" : "Premium Member"}
                </p>
              </div>
              <div className="pt-4 border-t border-border space-y-2">
                {user.role === "admin" && (
                  <Button
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => router.push("/admin")}
                  >
                    <Package size={16} />
                    Admin Panel
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/")}
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Recent */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Order */}
            {recentOrder && (
              <Card>
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Clock size={20} className="text-primary" />
                    Recent Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-1">Order ID</p>
                        <p className="text-text-primary font-mono text-sm">{recentOrder.id}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusBadgeClass(recentOrder.status || "pending")}`}>
                        {getStatusIcon(recentOrder.status || "pending")}
                        <span className="text-xs font-semibold capitalize">{recentOrder.status || "Pending"}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-1">Date</p>
                        <p className="text-text-primary">{formatDate(new Date(recentOrder.createdAt))}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-1">Amount</p>
                        <p className="text-primary font-semibold">{formatPrice(recentOrder.total)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2 font-display">
                  <ArrowRight size={20} className="text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <Button
                  variant="primary"
                  className="w-full justify-center gap-2"
                  onClick={() => router.push("/")}
                >
                  <ShoppingBag size={16} />
                  Explore Products
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-center gap-2"
                  onClick={() => router.push("/cart")}
                >
                  <ShoppingBag size={16} />
                  View Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order History Table */}
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2 font-display">
              <Package size={20} className="text-primary" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <Loader className="h-48" />
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-text-secondary/30 mb-4" />
                <p className="text-text-secondary mb-6">No orders yet. Start shopping to see them here.</p>
                <Button
                  variant="primary"
                  onClick={() => router.push("/")}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Order ID
                      </th>
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Date
                      </th>
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Items
                      </th>
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Total
                      </th>
                      <th className="text-left py-4 px-4 font-mono text-xs text-text-secondary uppercase tracking-widest">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-border hover:bg-surface/50 transition-colors"
                      >
                        <td className="py-4 px-4 font-mono text-xs text-primary">
                          {order.id.slice(0, 8)}...
                        </td>
                        <td className="py-4 px-4">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-4 px-4">
                          {order.items?.length || 0} item
                          {order.items?.length !== 1 ? "s" : ""}
                        </td>
                        <td className="py-4 px-4 font-semibold">
                          {formatPrice(order.total)}
                        </td>
                        <td className="py-4 px-4">
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border w-fit ${getStatusBadgeClass(order.status || "pending")}`}>
                            {getStatusIcon(order.status || "pending")}
                            <span className="text-xs font-semibold capitalize">{order.status || "Pending"}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
