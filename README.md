# Aurum Vista Pune – Luxury Resort Demo

Modern multi-page Next.js demo for a Pune luxury resort with Tailwind, animations, MongoDB, and Razorpay UPI payments. Built for future admin scalability.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- MongoDB (Mongoose)
- Razorpay Checkout (UPI, Cards, Wallets, Netbanking)

## Setup
1. Create `.env.local` with:
```
MONGODB_URI=
MONGODB_DB=aurum_vista
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```
2. Add media to `public/`: `hero.mp4`, `placeholder.jpg`, `rooms.jpg`, `spa.jpg`, `pool.jpg`, `dining.jpg`, `activities.jpg`, `gallery-hero.jpg`, `gallery-1.jpg`..`gallery-9.jpg`.
3. Install and run:
```
npm install
npm run dev
```
4. Seed rooms (once):
```
curl -X POST http://localhost:3000/api/seed
```

## Payment Flow
- Booking page checks `/api/availability` → creates Razorpay order via `/api/bookings` → opens Checkout → verifies at `/api/razorpay/verify` → redirects to `/booking/confirmed`.

## Future Admin Panel (scalable)
- Add auth (NextAuth) for staff
- Add admin routes/pages for Rooms CRUD, Availability, Bookings & Payments

## Notes
- No `@types/razorpay` available; client uses global `window.Razorpay` typed as `any` in `src/types/global.d.ts`.
