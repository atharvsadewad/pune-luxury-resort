import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import { connectToDatabase } from "@/src/lib/db";
import { Room } from "@/src/models/Room";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const roomType = searchParams.get("roomType");

  if (!checkIn || !checkOut || !roomType) {
    return NextResponse.json({ available: false, message: "Missing parameters" }, { status: 400 });
  }

  await connectToDatabase();
  const room = await Room.findOne({ type: roomType });
  if (!room) {
    return NextResponse.json({ available: false }, { status: 200 });
  }

  const nights = Math.max(1, dayjs(checkOut).diff(dayjs(checkIn), "day"));
  const price = nights * room.pricePerNight;
  return NextResponse.json({ available: true, price });
}

