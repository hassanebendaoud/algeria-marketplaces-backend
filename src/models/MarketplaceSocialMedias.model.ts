import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    URLs: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        website: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
      },
    ],

    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Marketplaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Marketplace",
      },
    ],
  },
  { timestamps: true }
);

export default model("MarketplaceSocialMedia", schema);
