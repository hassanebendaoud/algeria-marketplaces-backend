import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;
import fileConstant from "../constants/file.constant";

const schema = new Schema(
  {
    ...fileConstant,

    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Listings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
  },
  { timestamps: true }
);

export default model("MarketplaceVideo", schema);
