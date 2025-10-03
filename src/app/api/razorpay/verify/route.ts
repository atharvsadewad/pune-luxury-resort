import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Booking } from "@/models/Booking";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = body;
  const secret = process.env.RAZORPAY_KEY_SECRET as string;
  if (!secret || !process.env.MONGODB_URI) {
    return NextResponse.json({ success: true, demo: true });
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;
  await connectToDatabase();
  const booking = await Booking.findById(bookingId);
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  if (isValid) {
    booking.status = "paid";
    booking.razorpayPaymentId = razorpay_payment_id;
    await booking.save();
    return NextResponse.json({ success: true });
  } else {
    booking.status = "failed";
    await booking.save();
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

