import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Room } from "@/models/Room";

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json([
      { type: "deluxe", pricePerNight: 6000 },
      { type: "suite", pricePerNight: 9000 },
      { type: "villa", pricePerNight: 15000 },
    ]);
  }
  await connectToDatabase();
  const rooms = await Room.find();
  return NextResponse.json(rooms);
}

