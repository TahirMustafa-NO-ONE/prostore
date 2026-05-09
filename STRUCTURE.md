# ProStore - Project Structure Guide

## Overview

ProStore is organized using a scalable, modular structure that separates concerns and makes the codebase maintainable.

## Directory Structure

### `/app` - Next.js App Router

```
app/
├── api/                          # API routes
│   ├── auth/
│   │   ├── login/route.ts       # User login endpoint
│   │   └── signup/route.ts      # User registration endpoint
│   ├── orders/
│   │   └── route.ts             # Order management endpoints
│   ├── products/
│   │   ├── route.ts             # Get all products
│   │   └── [id]/route.ts        # Get single product
│   └── users/
│       └── me/route.ts          # Get current user
│
├── auth/                         # Authentication pages
│   ├── login/page.tsx
│   └── signup/page.tsx
│
├── products/                     # Product pages
│   ├── page.tsx                 # Products listing
│   └── [id]/page.tsx            # Product details
│
├── cart/
│   └── page.tsx                 # Shopping cart page
│
├── checkout/
│   ├── page.tsx                 # Checkout form
│   └── success/page.tsx         # Order confirmation
│
├── dashboard/
│   └── page.tsx                 # User dashboard
│
├── admin/
│   └── page.tsx                 # Admin panel
│
├── layout.tsx                    # Root layout component
├── page.tsx                      # Home page
└── globals.css                   # Global styles
```

### `/components` - Reusable Components

```
components/
├── ui/                          # Base UI components
│   ├── Button.tsx              # Button component with variants
│   ├── Card.tsx                # Card container
│   ├── Input.tsx               # Text input
│   ├── Textarea.tsx            # Text area
│   ├── Toast.tsx               # Toast notifications
│   └── Loading.tsx             # Loading states
│
├── navigation/
│   ├── Header.tsx              # Navigation header
│   └── Footer.tsx              # Footer component
│
├── products/
│   ├── ProductCard.tsx         # Single product card
│   └── ProductGrid.tsx         # Grid of products
│
└── cart/
    ├── CartItem.tsx            # Individual cart item
    └── CartSummary.tsx         # Cart totals
```

### `/lib` - Utility Functions & Services

```
lib/
├── auth/
│   ├── jwt.ts                  # JWT token utilities
│   └── password.ts             # Password hashing
│
├── db/
│   └── prisma.ts               # Prisma client instance
│
└── utils.ts                    # General utilities
    ├── cn()                    # Class name merging
    ├── formatPrice()           # Currency formatting
    └── formatDate()            # Date formatting
```

### `/store` - State Management (Zustand)

```
store/
├── cart.ts                      # Shopping cart state
│   ├── addToCart()
│   ├── removeFromCart()
│   ├── updateQuantity()
│   └── clearCart()
│
├── auth.ts                      # Authentication state
│   ├── user
│   ├── token
│   ├── setUser()
│   └── logout()
│
└── ui.ts                        # UI state
    ├── isDarkMode
    ├── isCartOpen
    └── toggleDarkMode()
```

### `/prisma` - Database Schema

```
prisma/
├── schema.prisma                # Database models
│   ├── User
│   ├── Product
│   ├── Order
│   ├── Category
│   ├── Review
│   └── Address
└── migrations/                  # Database migrations
```

### `/types` - TypeScript Type Definitions

```
types/
└── index.ts                     # All type definitions
    ├── User
    ├── Product
    ├── Order
    ├── Cart
    ├── Address
    └── ApiResponse
```

### `/scripts` - Utility Scripts

```
scripts/
└── seed.js                      # Database seeding
```

### `/public` - Static Assets

```
public/
├── images/
└── ... other static files
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`)
- **Types**: PascalCase (e.g., `User`, `Product`)
- **Constants**: UPPER_CASE (e.g., `API_URL`)

## Data Flow & Architecture

### Component to Store

```
User Interaction
    ↓
React Component
    ↓
Zustand Store (State)
    ↓
LocalStorage (Persistence)
```

### Component to API

```
User Interaction
    ↓
React Component
    ↓
API Call (fetch)
    ↓
API Route Handler
    ↓
Prisma Query
    ↓
MongoDB
    ↓
Response back to Component
```

## Authentication Flow

```
User Input (Email/Password)
    ↓
Sign Up/Login Page
    ↓
API Route (/api/auth/signup or /api/auth/login)
    ↓
Hash Password & Store in DB (or Verify)
    ↓
Generate JWT Token
    ↓
Send Token to Client
    ↓
Store in Auth Store & LocalStorage
    ↓
Set Authorization Header for Future Requests
```

## Cart Management Flow

```
Add to Cart
    ↓
Update Zustand Store
    ↓
Persist to LocalStorage
    ↓
Update UI
    ↓
Checkout
    ↓
Send Order to API
    ↓
Clear Cart Store
    ↓
Redirect to Success
```

## Page Protection

### Public Pages
- `/` - Home
- `/auth/login` - Login
- `/auth/signup` - Sign up
- `/products` - Product listing
- `/products/[id]` - Product details

### Protected Pages (Login Required)
- `/dashboard` - User dashboard
- `/checkout` - Checkout page
- `/cart` - Shopping cart (optional)

### Admin Pages (Admin Role Required)
- `/admin` - Admin panel

## Best Practices Used

1. **Separation of Concerns**
   - Components for UI
   - Stores for state
   - Routes for API endpoints
   - Types for type safety

2. **Reusable Components**
   - Base UI components in `/components/ui`
   - Feature components in `/components/[feature]`
   - Props-based configuration

3. **Type Safety**
   - TypeScript for all files
   - Centralized type definitions
   - Interface exports

4. **State Management**
   - Zustand for client-side state
   - LocalStorage for persistence
   - Clear separation of concerns

5. **API Design**
   - RESTful endpoints
   - Consistent response format
   - Error handling

## Performance Optimizations

1. **Components**
   - Client-side rendering where needed
   - Lazy loading with `Suspense`
   - Memoization when needed

2. **Images**
   - Next.js Image optimization
   - Remote pattern configuration
   - Responsive images

3. **Data Fetching**
   - Optimistic updates for cart
   - API request batching
   - Caching strategies

## Extension Points

### Adding a New Feature

1. **Create types** in `/types/index.ts`
2. **Create components** in `/components/[feature]/`
3. **Create store** if needed in `/store/`
4. **Create API routes** in `/app/api/[feature]/`
5. **Create pages** in `/app/[feature]/`

### Adding a New Component

1. Create in appropriate `/components/` directory
2. Export from component file
3. Use in pages/other components
4. Add TypeScript props interface

## Configuration Files

- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration
- **`next.config.ts`** - Next.js configuration
- **`.env.example`** - Environment variable template
- **`prisma/schema.prisma`** - Database schema

---

This structure makes it easy to:
- Scale the application
- Add new features
- Maintain code quality
- Collaborate with team members
