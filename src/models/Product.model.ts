import mongoose from "mongoose";
import slugify from "slugify";
import utils from "../utils";
import { ProductModel } from "./";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    Marketplace: {
      type: Schema.Types.ObjectId,
      ref: "Marketplace",
      select: false,
    },
    Images: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductImage",
        select: false,
      },
    ],
    Videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductVideo",
        select: false,
      },
    ],

    Comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductComment",
        select: false,
      },
    ],
    Reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductReview",
        select: false,
      },
    ],
    Likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductLike",
        select: false,
      },
    ],
    Votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductVote",
        select: false,
      },
    ],
    Favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductFavorite",
        select: false,
      },
    ],
  },
  { timestamps: true }
);

schema.index({
  title: "text",
  description: "text",
});

schema.pre("save", async function (next) {
  const slugifySlug = slugify(this.title, { lower: true });
  this.slug = await utils.createUniqueSlug(ProductModel, slugifySlug);
  next();
});

export default model("Product", schema);
