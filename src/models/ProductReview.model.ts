import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
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
        Product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    { timestamps: true }
);

export default model('ProductReview', schema);
