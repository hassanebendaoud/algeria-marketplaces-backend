import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
    {
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

export default model('MarketplaceLike', schema);
