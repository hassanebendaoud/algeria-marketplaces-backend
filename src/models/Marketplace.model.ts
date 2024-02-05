import mongoose from 'mongoose';
import slugify from 'slugify';

import utils from '../utils';
import MarketplaceModel from './Marketplace.model';

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
      ref: "MarketplaceSocialMedia",
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
        ref: "MarketplaceAvatar",
        select: false,
      },
    ],
    Images: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceImage",
        select: false,
      },
    ],
    Videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceVideo",
        select: false,
      },
    ],
    ContactsInformation: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceContactInformation",
        select: false,
      },
    ],
    Addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceAddress",
        select: false,
      },
    ],

    Comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceComment",
        select: false,
      },
    ],
    Reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceReview",
        select: false,
      },
    ],
    Likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceLike",
        select: false,
      },
    ],
    Votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceVote",
        select: false,
      },
    ],
    Favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceFavorite",
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
