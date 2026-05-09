# ProStore - E-Commerce MVP

A modern, fully functional E-Commerce MVP built with Next.js, TypeScript, Tailwind CSS, and MongoDB. Features clean UI, responsive design, and a complete shopping experience.

## 🎯 Features

### Core Functionality
- ✅ **User Authentication** - Email/password registration and login with JWT
- ✅ **Product Catalog** - Browse products with search and category filters
- ✅ **Product Details** - Full product information with image gallery
- ✅ **Shopping Cart** - Add/remove items with persistent local storage
- ✅ **Checkout** - Simple checkout flow with shipping information
- ✅ **Order Management** - Track orders in user dashboard
- ✅ **Admin Panel** - Add/edit/delete products
- ✅ **Responsive Design** - Mobile-first responsive layout
- ✅ **Modern UI** - Clean design with Tailwind CSS

### Technical Features
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Prisma** ORM with MongoDB
- **Zustand** for state management
- **Form validation** with React Hook Form & Zod
- **API Routes** for backend operations
- **JWT Authentication**

## 📁 Project Structure

```
prostore/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/        # Authentication endpoints
│   │   ├── products/    # Product endpoints
│   │   ├── orders/      # Order endpoints
│   │   └── users/       # User endpoints
│   ├── auth/            # Authentication pages
│   ├── products/        # Product pages
│   ├── cart/            # Cart page
│   ├── checkout/        # Checkout pages
│   ├── dashboard/       # User dashboard
│   ├── admin/           # Admin panel
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── ui/              # Reusable UI components
│   ├── navigation/      # Header, Footer
│   ├── products/        # Product components
│   └── cart/            # Cart components
├── lib/
│   ├── auth/            # Authentication utilities
│   ├── db/              # Database utilities
│   └── utils.ts         # Helper functions
├── store/               # Zustand stores
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── types/               # TypeScript types
├── scripts/             # Seed data
└── public/              # Static files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm or pnpm

### Installation

1. **Clone and install dependencies**
   ```bash
   cd prostore
   pnpm install
   # or
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/prostore?retryWrites=true&w=majority"
   JWT_SECRET="your-super-secret-jwt-key"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

3. **Set up Prisma**
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   # or pnpm prisma migrate deploy
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### User Registration
1. Click "Sign Up" in the header
2. Enter email, password, and full name
3. Account created with JWT token stored

### Shopping
1. Browse products on the Products page
2. Use search and category filters
3. Click product to view details
4. Add items to cart
5. View cart and adjust quantities
6. Proceed to checkout

### Checkout
1. Enter shipping address
2. Review order summary
3. Click "Place Order"
4. Order confirmation page with order ID

### User Dashboard
1. Login to your account
2. View profile information
3. Check order history and status
4. Access quick actions

### Admin Panel
**Login as Admin:** 
- Email: `admin@example.com`
- Password: `admin123` (for demo)

Features:
- Add new products with image URLs
- Edit existing products
- Delete products
- View all products and stock levels

## 🔐 Authentication

### Login Endpoints
```
POST /api/auth/login
POST /api/auth/signup
GET /api/users/me
```

### Protected Routes
Routes requiring authentication:
- `/dashboard` - User dashboard
- `/checkout` - Checkout page
- `/admin/*` - Admin panel

## 📦 API Routes

### Products
```
GET    /api/products              # Get all products
GET    /api/products/[id]         # Get product by ID
```

### Orders
```
POST   /api/orders                # Create order
GET    /api/orders                # Get user's orders
```

### Authentication
```
POST   /api/auth/login            # User login
POST   /api/auth/signup           # User registration
GET    /api/users/me              # Get current user
```

## 🎨 Customization

### Styling
- Tailwind CSS configured in `tailwind.config.ts`
- Custom colors in `app/globals.css`
- Component-specific styles inline

### Adding Products
Products are stored in Prisma. To add sample data, modify `scripts/seed.js` and run:
```bash
pnpm seed
```

### Environment Variables
Configure in `.env.local`:
- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - JWT signing key
- `NEXT_PUBLIC_API_URL` - API base URL

## 📱 Responsive Design

- **Mobile** - Optimized for small screens
- **Tablet** - Adjusted layout for medium screens  
- **Desktop** - Full featured layout

## 🛠️ Development

### Build
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

### Linting
```bash
pnpm lint
```

## 📚 Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page with hero and featured products |
| `store/cart.ts` | Cart state management |
| `store/auth.ts` | Authentication state |
| `lib/auth/jwt.ts` | JWT token utilities |
| `lib/db/prisma.ts` | Database client |
| `prisma/schema.prisma` | Database schema |
| `components/ui/*` | Reusable UI components |

## 🧪 Sample Credentials

### Admin Account (Demo)
- **Email:** admin@example.com  
- **Password:** admin123

### Test User (Create Your Own)
- Go to `/auth/signup` and create an account

## 🔄 Data Flow

```
User → Components → Store (Zustand) → API Routes → Database
```

1. **User Interaction** - User clicks button/form
2. **Components** - React components handle UI
3. **Store** - Zustand manages client-side state
4. **API Routes** - Next.js API endpoints process data
5. **Database** - Prisma stores/retrieves from MongoDB

## 🚢 Deployment

### Vercel (Recommended)
```bash
pnpm build
# Then deploy to Vercel
```

### Environment Variables (Production)
Set these in your hosting provider:
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXTAUTH_SECRET`

## 📝 Notes

- Cart persists in localStorage
- Payment integration is placeholder
- No actual payment processing
- Use Stripe for real payments
- Email notifications not implemented

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this in your projects

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

