const fs = require("fs");
const path = require("path");

const sampleProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Professional-grade wireless headphones with ANC",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    categoryId: "1",
    stock: 15,
  },
  {
    id: "2",
    name: "Professional Camera",
    description: "4K video recording with AI features",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    categoryId: "1",
    stock: 8,
  },
  {
    id: "3",
    name: "Smart Watch Pro",
    description: "Track your fitness with style",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    categoryId: "1",
    stock: 12,
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    description: "Premium typing experience for professionals",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1587829191301-6e2174e9c4da?w=400&h=400&fit=crop",
    categoryId: "2",
    stock: 20,
  },
  {
    id: "5",
    name: "USB-C Hub",
    description: "7-in-1 multiport adapter",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
    categoryId: "2",
    stock: 30,
  },
  {
    id: "6",
    name: "Portable Speaker",
    description: "Waterproof Bluetooth speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    categoryId: "1",
    stock: 18,
  },
  {
    id: "7",
    name: "Laptop Stand",
    description: "Adjustable aluminum stand",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586253408147-aa0dc7a18cfe?w=400&h=400&fit=crop",
    categoryId: "2",
    stock: 25,
  },
  {
    id: "8",
    name: "Wireless Mouse",
    description: "Precision gaming mouse",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608644893453-e5d6b8a6ddee?w=400&h=400&fit=crop",
    categoryId: "2",
    stock: 35,
  },
];

const sampleCategories = [
  { id: "1", name: "Electronics", description: "Latest gadgets and devices" },
  {
    id: "2",
    name: "Accessories",
    description: "Enhance your experience",
  },
];

const sampleUser = {
  id: "1",
  email: "admin@example.com",
  password: "$2a$10$N9qo8uLOickgx2ZMRZoM.eXcPWCDEI7QBY7A3i5N1Q4L2KlZFN9N2", // hashed "admin123"
  name: "Admin User",
  role: "admin",
};

console.log("✓ Seed configuration loaded");
console.log(`  - ${sampleCategories.length} categories`);
console.log(`  - ${sampleProducts.length} products`);
console.log(`  - 1 admin user`);
console.log(
  "\nNote: Database seeding should be run after Prisma is configured with MongoDB."
);
