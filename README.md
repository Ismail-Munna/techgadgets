# TechGadgets eCommerce

A simple, polished eCommerce application built with Next.js App Router and NextAuth.js.

## Features

- **Responsive Landing Page:** Features a hero section, feature highlights, featured products, testimonials, and a newsletter signup.
- **Authentication:** Secure login and registration using NextAuth.js (Credentials and Google OAuth).
- **Product Catalog:** Browse a grid of products with search and filter UI.
- **Product Details:** View detailed information, images, and pricing for individual products.
- **Admin Dashboard:** Protected routes for managing inventory.
  - **Add Product:** Form with validation to add new products.
  - **Manage Products:** Table view to list and delete products.

## Technologies Used

- **Framework:** Next.js 15 (App Router)
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form, Zod
- **Notifications:** Sonner

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd techgadgets
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Route Summary

### Public Routes
- `/` - Landing Page
- `/login` - Login/Register Page
- `/products` - Product List Page
- `/products/[id]` - Product Details Page

### Protected Routes (Require Authentication)
- `/admin/add-product` - Add a new product to the catalog
- `/admin/manage-products` - View and delete existing products

## Demo Credentials
To test the protected routes without setting up Google OAuth, use the following credentials:
- **Email:** `user@example.com`
- **Password:** `password`
