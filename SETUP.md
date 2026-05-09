# ProStore - Setup Instructions

## Quick Start

Follow these steps to get ProStore running on your local machine.

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update `.env.local` with your MongoDB connection string and secret keys:

```env
DATABASE_URL="mongodb+srv://your-username:your-password@cluster.mongodb.net/prostore?retryWrites=true&w=majority"
JWT_SECRET="your-secret-key-change-this"
NEXTAUTH_SECRET="your-nextauth-secret-change-this"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or with npm:
```bash
npm install
```

### 3. Setup Database

Generate Prisma client and push schema to MongoDB:

```bash
pnpm prisma generate
pnpm prisma db push
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup (MongoDB)

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Get connection string
6. Add to `.env.local` as `DATABASE_URL`

### Option 2: Local MongoDB

```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

Connection string: `mongodb://localhost:27017/prostore`

## Key Configuration Files

### Prisma (`prisma/schema.prisma`)
- Database models: User, Product, Order, Category
- Relationships between entities
- MongoDB-specific configurations

### Tailwind (`tailwind.config.ts`)
- Custom colors and spacing
- Theme extensions
- Plugin configurations

### Next.js (`next.config.ts`)
- Image optimization
- TypeScript settings
- ESLint configuration

## Project Features

### Authentication
- Email/password login and signup
- JWT-based authentication
- Protected API routes and pages

### Shopping Features
- Product listing with filters
- Product details with images
- Shopping cart with local storage
- Checkout process
- Order tracking

### Admin Features
- Product management (CRUD)
- View product inventory
- Manage orders

## Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Build & Release
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm prisma studio   # Open Prisma Studio
pnpm prisma generate # Generate Prisma client
pnpm seed            # Seed database with sample data

# Linting
pnpm lint            # Run ESLint
```

## Testing

### Create Test Account

1. Go to [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)
2. Create account with test data
3. Login with credentials

### Admin Account

For testing admin features, you need to set user role to "admin" in the database:

```prisma
// Via Prisma Studio
pnpm prisma studio

// Find user and change role to "admin"
```

## Troubleshooting

### Port Already in Use

If port 3000 is in use:
```bash
pnpm dev -p 3001
```

### Database Connection Error

1. Verify MongoDB connection string
2. Check network access in MongoDB Atlas
3. Ensure DATABASE_URL is in `.env.local`

### Prisma Issues

Clear cache and regenerate:
```bash
rm -rf node_modules/.prisma
pnpm prisma generate
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

Environment variables needed on Vercel:
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXTAUTH_SECRET`

### Other Platforms

Ensure your platform supports:
- Node.js 18+
- Environment variables
- Serverless functions
- MongoDB connectivity

## Support

For issues and questions:
1. Check the README.md
2. Review API routes in `app/api/`
3. Check component implementation in `components/`
4. Review store setup in `store/`

---

**Happy coding! Build something great with ProStore!**
