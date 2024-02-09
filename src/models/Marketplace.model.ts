import mongoose from 'mongoose';
import slugify from 'slugify';

import { MarketplaceInterface } from '@/interfaces/marketplaces.interfaces';
import { MarketplaceModel } from '@models/index';
import utils from '@utils/index';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<MarketplaceInterface>(
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
            ref: 'User',
            required: true,
        },
        SocialMedias: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceSocialMedia',
            },
        ],

        Products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        Avatars: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceAvatar',
            },
        ],
        Images: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceImage',
            },
        ],
        Videos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceVideo',
            },
        ],
        ContactsInformation: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceContactInformation',
            },
        ],
        Addresses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceAddress',
            },
        ],

        Comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceComment',
            },
        ],
        Reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceReview',
            },
        ],
        Likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceLike',
            },
        ],
        Votes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceVote',
            },
        ],
        Favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MarketplaceFavorite',
            },
        ],
    },
    { timestamps: true }
);

schema.index({
    name: 'text',
    username: 'text',
    description: 'text',
});

schema.pre('save', async function (next) {
    const slugifySlug = slugify(this.name, { lower: true });
    this.slug = await utils.createUniqueSlug(MarketplaceModel, slugifySlug);
    next();
});

export default model<MarketplaceInterface>('Marketplace', schema);
