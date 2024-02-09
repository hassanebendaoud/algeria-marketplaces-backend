import { ObjectId } from 'bson';
import { z } from 'zod';

const createMarketplacesCommentsSchema = z.strictObject(
    {
        body: z.strictObject({
            title: z.string(),
            content: z.string(),
        }),
        query: z.strictObject({
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Marketplace Comment Schema',
    }
);
const deleteMarketplacesCommentsSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceCommentId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Marketplace Comment Schema',
    }
);
const getAllMarketplacesCommentsSchema = z.strictObject(
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

const getOneByIdMarketplacesCommentsSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceCommentId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Comment Schema',
    }
);

const updateMarketplacesCommentsSchema = z.strictObject(
    {
        body: z.strictObject({
            title: z.string(),
            content: z.string(),
        }),
        query: z.strictObject({
            marketplaceCommentId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Marketplace Comment Schema',
    }
);

const marketplacesCommentsSchemas = {
    createMarketplacesCommentsSchema,
    updateMarketplacesCommentsSchema,
    deleteMarketplacesCommentsSchema,

    getAllMarketplacesCommentsSchema,
    getOneByIdMarketplacesCommentsSchema,
};

export default marketplacesCommentsSchemas;
