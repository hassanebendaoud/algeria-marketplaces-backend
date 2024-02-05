import mongoose from "mongoose";
import { fileConstant } from "../constants";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
  {
    ...fileConstant,

    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    Marketplaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Marketplace",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default model("MarketplaceCover", schema);
