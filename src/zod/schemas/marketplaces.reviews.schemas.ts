import { ObjectId } from 'bson';
import { z } from 'zod';

const createMarketplacesReviewsSchema = z.strictObject(
    {
        body: z.strictObject({
            star: z.number().min(1).max(5),
            content: z.string(),
        }),
        query: z.strictObject({
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Marketplace Review Schema',
    }
);
const deleteMarketplacesReviewsSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceReviewId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Marketplace Review Schema',
    }
);
const getAllMarketplacesReviewsSchema = z.strictObject(
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

const getOneByIdMarketplacesReviewsSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceReviewId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Review Schema',
    }
);

const updateMarketplacesReviewsSchema = z.strictObject(
    {
        body: z.strictObject({
            star: z.number().min(1).max(5),
            content: z.string(),
        }),
        query: z.strictObject({
            marketplaceReviewId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Marketplace Review Schema',
    }
);

const marketplacesReviewsSchemas = {
    createMarketplacesReviewsSchema,
    updateMarketplacesReviewsSchema,
    deleteMarketplacesReviewsSchema,

    getAllMarketplacesReviewsSchema,
    getOneByIdMarketplacesReviewsSchema,
};

export default marketplacesReviewsSchemas;
