import { MarketplaceContactInformationInterface } from '@/interfaces/marketplaces.interfaces';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema<MarketplaceContactInformationInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        emails: [
            {
                value: {
                    type: String,
                    required: true,
                },
            },
        ],
        phoneNumbers: [
            {
                countryCode: {
                    type: String,
                    required: true,
                },
                dialCode: {
                    type: String,
                    required: true,
                },
                format: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                value: {
                    type: String,
                    required: true,
                },
                formattedValue: {
                    type: String,
                    required: true,
                },
            },
        ],

        User: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        Marketplaces: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Marketplace',
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export default model<MarketplaceContactInformationInterface>(
    'MarketplaceContactInformation',
    schema
);
