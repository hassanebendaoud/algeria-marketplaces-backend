import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
    {
        streetAddress: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 50,
        },
        postalCode: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 50,
        },
        country: {
            name: {
                type: String,
                required: true,
                minLength: 1,
                maxLength: 50,
            },
            iso3: {
                type: String,
                required: true,
                minLength: 1,
                maxLength: 50,
            },
            iso2: {
                type: String,
                required: true,
                minLength: 1,
                maxLength: 50,
            },
        },
        state: {
            name: {
                type: String,
            },
            stateCode: {
                type: String,
            },
        },
        city: {
            name: {
                type: String,
            },
        },

        User: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        Products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
    },
    { timestamps: true }
);

export default model('ProductAddress', schema);
