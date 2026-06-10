import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  artist: String,
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: "missing Venue",
  },
  date: Date,
  description: String,
  slug: { type: String, required: "missing slug", unique: true, index: true },
});
export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);