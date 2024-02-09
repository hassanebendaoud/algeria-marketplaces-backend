import { ProductLikeInterface } from '@/interfaces/products.interfaces';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<ProductLikeInterface>(
    {
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

export default model<ProductLikeInterface>('ProductLike', schema);
