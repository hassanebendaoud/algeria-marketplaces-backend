import mongoose from 'mongoose';

import { fileConstant } from '@constants/index';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
    {
        ...fileConstant,

        User: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        Listings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Listing',
            },
        ],
    },
    { timestamps: true }
);

export default model('MarketplaceVideo', schema);
