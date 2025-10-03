import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectToDatabase } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { Room } from "@/models/Room";
import dayjs from "dayjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, checkIn, checkOut, guests, roomType } = body || {};
  if (!name || !email || !phone || !checkIn || !checkOut || !guests || !roomType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const nights = Math.max(1, dayjs(checkOut).diff(dayjs(checkIn), "day"));
  const base = roomType === "suite" ? 9000 : roomType === "villa" ? 15000 : 6000;
  const price = nights * base;

  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ id: "demo_order", amount: Math.round(price * 100), currency: "INR", bookingId: "demo_booking" });
  }

  await connectToDatabase();
  const room = await Room.findOne({ type: roomType });
  if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });
  const dbPrice = nights * room.pricePerNight;

  const booking = await Booking.create({ name, email, phone, checkIn, checkOut, guests, roomType, price: dbPrice, status: "pending" });

  const key_id = process.env.RAZORPAY_KEY_ID as string;
  const key_secret = process.env.RAZORPAY_KEY_SECRET as string;
  if (!key_id || !key_secret) {
    return NextResponse.json({ error: "Razorpay keys not configured" }, { status: 500 });
  }

  const instance = new Razorpay({ key_id, key_secret });
  const order = await instance.orders.create({
    amount: Math.round(dbPrice * 100),
    currency: "INR",
    receipt: booking._id.toString(),
  });

  booking.razorpayOrderId = order.id;
  await booking.save();

  return NextResponse.json({ id: order.id, amount: order.amount, currency: order.currency, bookingId: booking._id.toString() });
}

