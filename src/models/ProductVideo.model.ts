import mongoose from 'mongoose';

import { fileConstant } from '@constants/index';
import { ProductVideoInterface } from '@/interfaces/products.interfaces';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<ProductVideoInterface>(
    {
        ...fileConstant,

        User: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        Product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    { timestamps: true }
);

export default model('ProductVideo', schema);
