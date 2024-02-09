import { UserInterface } from '@/interfaces/users.interface';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<UserInterface>(
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
                ref: 'MarketplaceAvatar',
            },
        ],
        MarketplaceImages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceImage',
            },
        ],
        MarketplaceVideos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceVideo',
            },
        ],
        Marketplaces: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Marketplace',
            },
        ],
        Products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        MarketplaceContactsInformation: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceContactInformation',
            },
        ],
        MarketplaceAddresses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceAddress',
            },
        ],
        MarketplaceSocialMedias: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceSocialMedia',
            },
        ],
        MarketplaceComments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceComment',
            },
        ],
        MarketplaceReviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceReview',
            },
        ],
        MarketplaceLikes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceLike',
            },
        ],
        MarketplaceVotes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceVote',
            },
        ],
        MarketplaceFavorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceFavorite',
            },
        ],

        ProductComments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductComment',
            },
        ],
        ProductReviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductReview',
            },
        ],

        ProductLikes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductLike',
            },
        ],
        ProductVotes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductVote',
            },
        ],
        ProductFavorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductFavorite',
            },
        ],
    },
    { timestamps: true }
);

export default model<UserInterface>('User', schema);
