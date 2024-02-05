import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },

    gender: {
      type: String,
    },
    dateBirthday: {
      type: String,
    },

    MarketplaceAvatars: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceAvatar",
        select: false,
      },
    ],
    MarketplaceImages: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceImage",
        select: false,
      },
    ],
    MarketplaceVideos: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceVideo",
        select: false,
      },
    ],
    Marketplaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Marketplace",
        select: false,
      },
    ],
    Products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        select: false,
      },
    ],
    MarketplaceContactsInformation: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceContactInformation",
        select: false,
      },
    ],
    MarketplaceAddresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceAddress",
        select: false,
      },
    ],
    MarketplaceSocialMedias: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceSocialMedia",
        select: false,
      },
    ],
    MarketplaceComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceComment",
        select: false,
      },
    ],
    MarketplaceReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceReview",
        select: false,
      },
    ],
    MarketplaceLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceLike",
        select: false,
      },
    ],
    MarketplaceVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceVote",
        select: false,
      },
    ],
    MarketplaceFavorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "MarketplaceFavorite",
        select: false,
      },
    ],

    ProductLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductLike",
        select: false,
      },
    ],
    ProductVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductVote",
        select: false,
      },
    ],
    ProductFavorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductFavorite",
        select: false,
      },
    ],
  },
  { timestamps: true }
);

export default model("User", schema);
