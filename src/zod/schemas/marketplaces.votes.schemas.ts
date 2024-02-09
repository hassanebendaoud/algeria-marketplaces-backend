import { ObjectId } from 'bson';
import { z } from 'zod';

const createMarketplacesVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Marketplace Vote Schema',
    }
);
const deleteMarketplacesVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceVoteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Marketplace Vote Schema',
    }
);
const getAllMarketplacesVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            page: z.string(),
            size: z.string(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get All Marketplaces Schema',
    }
);

const getOneByIdMarketplacesVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceVoteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Vote Schema',
    }
);

const updateMarketplacesVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceVoteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Marketplace Vote Schema',
    }
);

const marketplacesVotesSchemas = {
    createMarketplacesVotesSchema,
    updateMarketplacesVotesSchema,
    deleteMarketplacesVotesSchema,

    getAllMarketplacesVotesSchema,
    getOneByIdMarketplacesVotesSchema,
};

export default marketplacesVotesSchemas;
