import mongoose, { Schema, model, models } from "mongoose";

export interface RoomDocument extends mongoose.Document {
  name: string;
  type: "deluxe" | "suite" | "villa";
  description: string;
  pricePerNight: number;
  images: string[];
  capacity: number;
}

const RoomSchema = new Schema<RoomDocument>({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["deluxe", "suite", "villa"] },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  images: { type: [String], default: [] },
  capacity: { type: Number, default: 2 },
});

export const Room = models.Room || model<RoomDocument>("Room", RoomSchema);

