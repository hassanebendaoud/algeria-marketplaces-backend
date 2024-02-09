import mongoose from 'mongoose';

import { fileConstant } from '@constants/index';
import { MarketplaceImageInterface } from '@/interfaces/marketplaces.interfaces';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<MarketplaceImageInterface>(
    {
        ...fileConstant,

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

export default model('MarketplaceImage', schema);
