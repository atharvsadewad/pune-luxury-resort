import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Room } from "@/models/Room";

export async function GET() {
  await connectToDatabase();
  const rooms = await Room.find();
  return NextResponse.json(rooms);
}

