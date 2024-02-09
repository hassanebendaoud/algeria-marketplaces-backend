import { MarketplaceVoteInterface } from '@/interfaces/marketplaces.interfaces';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<MarketplaceVoteInterface>(
    {
        User: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        Marketplace: {
            type: Schema.Types.ObjectId,
            ref: 'Marketplace',
            required: true,
        },
    },
    { timestamps: true }
);

export default model<MarketplaceVoteInterface>('MarketplaceVote', schema);
