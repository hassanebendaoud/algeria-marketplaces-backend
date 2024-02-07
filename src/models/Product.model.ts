import mongoose from 'mongoose';
import slugify from 'slugify';

import { ProductInterface } from '@/interfaces/products.interfaces';
import utils from '@utils/index';

import { ProductModel } from './';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<ProductInterface>(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

        User: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        Marketplace: {
            type: Schema.Types.ObjectId,
            ref: 'Marketplace',
        },
        Images: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductImage',
            },
        ],
        Videos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductVideo',
            },
        ],

        Comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductComment',
            },
        ],
        Reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductReview',
            },
        ],
        Likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductLike',
            },
        ],
        Votes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductVote',
            },
        ],
        Favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductFavorite',
            },
        ],
    },
    { timestamps: true }
);

schema.index({
    title: 'text',
    description: 'text',
});

schema.pre('save', async function (next) {
    const slugifySlug = slugify(this.title, { lower: true });
    this.slug = await utils.createUniqueSlug(ProductModel, slugifySlug);
    next();
});

export default model<ProductInterface>('Product', schema);
