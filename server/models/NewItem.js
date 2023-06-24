import mongoose from "mongoose";

const NewItemSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

const NewItem = mongoose.model("NewItem", NewItemSchema);
export default NewItem;
