import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/src/lib/db";
import { Room } from "@/src/models/Room";

export async function GET() {
  await connectToDatabase();
  const rooms = await Room.find();
  return NextResponse.json(rooms);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const body = await req.json();
  const room = await Room.create(body);
  return NextResponse.json(room);
}

