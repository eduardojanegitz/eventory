import mongoose from "mongoose";

const CostSchema = new mongoose.Schema(
  {
    name: String,
    code: Number,
    description: String,
  },
  { timestamps: true }
);

const Cost = mongoose.model("Cost", CostSchema);
export default Cost;
