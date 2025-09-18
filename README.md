# Nova Nest E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js, Medusa.js, and modern web technologies.

## 🚀 Features

### Frontend (Next.js Storefront)
- **Modern UI/UX**: Built with Next.js 15 and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful, responsive layouts
- **Product Catalog**: Browse products, categories, and collections
- **Shopping Cart**: Add to cart, update quantities, and manage items
- **Checkout Process**: Complete checkout with Stripe payment integration
- **User Authentication**: Login, registration, and account management
- **Order Management**: View order history and track orders
- **Search & Filtering**: Advanced product search and filtering capabilities

### Backend (Medusa.js)
- **Headless Commerce**: Flexible, API-first e-commerce backend
- **Product Management**: Full CRUD operations for products, variants, and categories
- **Order Processing**: Complete order lifecycle management
- **Payment Integration**: Stripe payment processing
- **Inventory Management**: Track stock levels and variants
- **Customer Management**: User accounts and customer data
- **Admin Dashboard**: Comprehensive admin interface for managing the store

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context API
- **Payment**: Stripe integration
- **UI Components**: Custom components with Radix UI

### Backend
- **Framework**: Medusa.js v2
- **Database**: PostgreSQL
- **API**: RESTful APIs with TypeScript
- **Payment**: Stripe payment provider
- **Authentication**: JWT-based authentication

## 📁 Project Structure

```
nova-nest-ecommerce/
├── frontend/          # Next.js storefront application
├── novanest/          # Medusa.js backend application
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL
- Git

### Backend Setup (Medusa.js)

1. **Navigate to the backend directory:**
   ```bash
   cd novanest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables in `.env`:
   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/medusa_db
   JWT_SECRET=your_jwt_secret
   COOKIE_SECRET=your_cookie_secret
   STRIPE_API_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Set up the database:**
   ```bash
   npx medusa db:migrate
   npx medusa db:seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The backend will be available at `http://localhost:9000`

### Frontend Setup (Next.js)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables in `.env.local`:
   ```env
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_medusa_publishable_key
   NEXT_PUBLIC_STRIPE_PK=your_stripe_publishable_key
   NEXT_PUBLIC_DEFAULT_REGION=us
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   MEDUSA_BACKEND_URL=http://localhost:9000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Add the keys to both backend and frontend environment files
4. Set up webhooks for payment processing

### Database Setup

1. Install PostgreSQL
2. Create a new database for the project
3. Update the `DATABASE_URL` in the backend `.env` file

## 📚 API Documentation

The Medusa.js backend provides comprehensive REST APIs for:
- Products and variants
- Cart management
- Order processing
- Customer management
- Payment processing

API documentation is available at `http://localhost:9000/docs` when the backend is running.

## 🧪 Testing

### Backend Testing
```bash
cd novanest
npm run test
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Backend Deployment
1. Set up a PostgreSQL database
2. Configure environment variables
3. Deploy to your preferred platform (Vercel, Railway, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Medusa.js documentation](https://docs.medusajs.com/)
2. Check the [Next.js documentation](https://nextjs.org/docs)
3. Open an issue in this repository

## 🙏 Acknowledgments

- [Medusa.js](https://medusajs.com/) for the amazing headless commerce platform
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Stripe](https://stripe.com/) for payment processing
