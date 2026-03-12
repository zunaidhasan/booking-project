# Booking Project

A full-stack service booking web application built with Next.js 15, Prisma, and Stripe. Users can browse services, book appointments, and pay online — while admins manage everything from a dedicated dashboard.

## 🚀 Features

- **Service Management**: Browse, view details, and book various services.
- **Admin Dashboard**: Comprehensive dashboard for managing services, bookings, and users.
- **Secure Authentication**: Robust user authentication and authorization.
- **Payment Integration**: Seamless payment processing with Stripe.
- **Email Notifications**: Automated email notifications via Resend.
- **Responsive Design**: Modern, mobile-first UI built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database**: [Prisma](https://www.prisma.io/) with PostgreSQL/MySQL
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Payments**: [Stripe](https://stripe.com/)
- **Email**: [Resend](https://resend.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- A running database instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/booking-project.git
   cd booking-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and fill in your credentials.
   ```bash
   cp .env.example .env
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable React components.
- `src/lib`: Utility functions and shared instances (Prisma client, etc.).
- `prisma`: Database schema and migrations.
- `public`: Static assets.

## 📜 License

This project is private and intended for internal use.
