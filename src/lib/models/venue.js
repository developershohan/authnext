import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  name: { type: String, required: "missing name", unique: true },
  address: { type: String, required: "missing address" },
  state: { type: String, required: "missing state" },
  country: { type: String, required: "missing country" },
  city: { type: String, required: "missing city" },
});

const Venue = mongoose.models.Venue || mongoose.model("Venue", venueSchema);
export default Venue
