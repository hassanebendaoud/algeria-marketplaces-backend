import mongoose from "mongoose";
import slugify from "slugify";
import MarketplaceModel from "./Marketplace.model";
import utils from "../utils";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
      required: true,
    },
    SocialMedia: {
      type: Schema.Types.ObjectId,
      ref: "SocialMedia",
      select: false,
    },

    Products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        select: false,
      },
    ],
    Avatars: [
      {
        type: Schema.Types.ObjectId,
        ref: "Avatar",
        select: false,
      },
    ],
    Images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        select: false,
      },
    ],
    Videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
        select: false,
      },
    ],
    ContactsInformation: [
      {
        type: Schema.Types.ObjectId,
        ref: "ContactInformation",
        select: false,
      },
    ],
    Addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
        select: false,
      },
    ],

    Comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        select: false,
      },
    ],
    Reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        select: false,
      },
    ],
    Likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
        select: false,
      },
    ],
    Votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vote",
        select: false,
      },
    ],
    Favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Favorite",
        select: false,
      },
    ],
  },
  { timestamps: true }
);

schema.index({
  name: "text",
  username: "text",
  description: "text",
});

schema.pre("save", async function (next) {
  const slugifySlug = slugify(this.name, { lower: true });
  this.slug = await utils.createUniqueSlug(MarketplaceModel, slugifySlug);
  next();
});

export default model("Marketplace", schema);
