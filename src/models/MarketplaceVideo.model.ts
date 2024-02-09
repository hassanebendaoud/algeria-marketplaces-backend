import mongoose from 'mongoose';

import { fileConstant } from '@constants/index';
import { MarketplaceVideoInterface } from '@/interfaces/marketplaces.interfaces';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<MarketplaceVideoInterface>(
    {
        ...fileConstant,

        User: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        Marketplace: {
            type: Schema.Types.ObjectId,
            ref: 'Listing',
        },
    },
    { timestamps: true }
);

export default model('MarketplaceVideo', schema);
