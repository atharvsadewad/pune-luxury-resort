import { NextResponse } from "next/server";
import { connectToDatabase } from "@/src/lib/db";
import { Room } from "@/src/models/Room";

export async function POST() {
  await connectToDatabase();
  const count = await Room.countDocuments();
  if (count > 0) {
    return NextResponse.json({ seeded: false, message: "Rooms already exist" });
  }
  await Room.create([
    { name: "Deluxe Room", type: "deluxe", description: "Elegant comfort", pricePerNight: 9000, images: ["/rooms.jpg"], capacity: 2 },
    { name: "Executive Suite", type: "suite", description: "Spacious luxury", pricePerNight: 16000, images: ["/suite.jpg"], capacity: 3 },
    { name: "Private Villa", type: "villa", description: "Ultimate privacy", pricePerNight: 28000, images: ["/villa.jpg"], capacity: 4 },
  ]);
  return NextResponse.json({ seeded: true });
}

