import { MarketplaceReviewInterface } from '@/interfaces/marketplaces.interfaces';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<MarketplaceReviewInterface>(
    {
        star: {
            type: Number,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        User: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        Marketplace: {
            type: Schema.Types.ObjectId,
            ref: 'Marketplace',
            required: true,
        },
    },
    { timestamps: true }
);

export default model<MarketplaceReviewInterface>('MarketplaceReview', schema);
