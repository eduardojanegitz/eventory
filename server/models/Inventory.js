import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    location: String,
    responsable: String,
    item: String
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
