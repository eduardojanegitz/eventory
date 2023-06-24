import mongoose from "mongoose";

// const { ItemGroup } = require("./ItemGroup");
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // itemGroup: {
    //   type: [ItemGroup],
    // },
    // dateAcquisition: Date,
    supplier: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    tag: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;
