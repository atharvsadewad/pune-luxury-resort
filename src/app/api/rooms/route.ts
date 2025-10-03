import { NextResponse } from "next/server";
import { connectToDatabase } from "@/src/lib/db";
import { Room } from "@/src/models/Room";

export async function GET() {
  await connectToDatabase();
  const rooms = await Room.find();
  return NextResponse.json(rooms);
}

