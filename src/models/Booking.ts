import mongoose, { Schema, model, models } from "mongoose";

export interface BookingDocument extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: "deluxe" | "suite" | "villa";
  price: number;
  status: "pending" | "paid" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
}

const BookingSchema = new Schema<BookingDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: Number, required: true },
  roomType: { type: String, required: true, enum: ["deluxe", "suite", "villa"] },
  price: { type: Number, required: true },
  status: { type: String, default: "pending" },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
}, { timestamps: true });

export const Booking = models.Booking || model<BookingDocument>("Booking", BookingSchema);

