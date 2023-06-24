import mongoose from "mongoose";

const MovementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    actualLocation: {
      type: String,
      required: true,
    },
    newLocation: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    observations: {
      type: String,
      required: true,
    },
    // responsable: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Movement = mongoose.model("Movement", MovementSchema);

export default Movement;
