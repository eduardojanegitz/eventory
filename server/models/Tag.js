import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    qtd: {
      type: Number,
      required: true,
      max: 50,
    },
   
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", TagSchema);

export default Tag;
