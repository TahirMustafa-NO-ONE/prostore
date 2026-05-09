# ProStore - Quick Start Guide

## 🚀 Start in 5 Minutes

### Prerequisites
- Node.js 18+
- MongoDB account (free tier available)
- npm or pnpm

### Step 1: Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 2: Install & Setup
```bash
pnpm install
pnpm prisma generate
pnpm prisma db push
```

### Step 3: Run
```bash
pnpm dev
```

Open http://localhost:3000 🎉

---

## 📱 First Actions

### Create Account
1. Click **Sign Up**
2. Enter email, password, name
3. Auto-logged in after signup

### Browse Products
1. Click **Products**
2. Search and filter
3. Click product for details

### Shopping
1. Click **Add to Cart**
2. Go to **Cart**
3. Proceed to **Checkout**
4. Enter shipping info
5. Complete order

### View Orders
1. Go to **Dashboard**
2. See order history

---

## 👨‍💼 Admin Features

### Login as Admin
- Email: `admin@example.com`
- Password: `admin123` (for testing)

Then change role in database for your accounts.

### Admin Actions
1. Go to **Admin Panel**
2. Add/Edit/Delete products
3. View inventory

---

## 🛠️ Development

### Key Files to Edit

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page |
| `components/` | Reusable components |
| `app/api/` | Backend logic |
| `store/` | State management |

### Common Tasks

**Add API endpoint:**
```bash
app/api/[feature]/route.ts
```

**Add page:**
```bash
app/[feature]/page.tsx
```

**Add component:**
```bash
components/[section]/MyComponent.tsx
```

---

## 📚 Documentation

| File | Content |
|------|---------|
| `README.md` | Project overview |
| `SETUP.md` | Detailed setup |
| `STRUCTURE.md` | Project structure |
| `DEPLOYMENT.md` | Deployment guide |

---

## 🔗 MongoDB Connection

### Get Connection String

1. [Open MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Create database user
5. Copy connection string
6. Add to `.env.local`

Format:
```
mongodb+srv://username:password@cluster.mongodb.net/prostore
```

---

## 💻 Commands Reference

```bash
# Development
pnpm dev           # Start dev server
pnpm build         # Build for production
pnpm start         # Start prod server
pnpm lint          # Check code

# Database
pnpm prisma studio    # Open database GUI
pnpm prisma generate  # Generate client
pnpm prisma db push   # Sync schema
```

---

## ✨ Features Included

✅ User authentication (Sign up/Login)
✅ Product catalog (Browse, search, filter)
✅ Product details (Images, description, reviews)
✅ Shopping cart (Add, remove, update qty)
✅ Checkout process (Shipping, order summary)
✅ Order tracking (View order history)
✅ Admin panel (Manage products)
✅ Responsive design (Mobile, tablet, desktop)
✅ Modern UI (Tailwind CSS)

---

## 🐛 Troubleshooting

**Can't connect to database?**
- Check DATABASE_URL in .env.local
- Check MongoDB network access
- Verify connection string

**Port 3000 in use?**
```bash
pnpm dev -p 3001
```

**Prisma errors?**
```bash
rm node_modules/.prisma
pnpm prisma generate
```

---

## 📞 Need Help?

1. Check `README.md` for features
2. Check `SETUP.md` for setup issues
3. Check `STRUCTURE.md` for code organization
4. Review API routes in `app/api/`
5. Check component implementation

---

## 🎯 Next Steps

1. ✅ Get app running locally
2. ✅ Test user registration
3. ✅ Add products
4. ✅ Test shopping flow
5. ✅ Customize design
6. ✅ Deploy to Vercel/other platform

---

**Happy building! 🚀**

For detailed instructions, refer to `SETUP.md`
