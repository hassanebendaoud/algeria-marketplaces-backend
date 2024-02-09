import { ObjectId } from 'bson';
import { z } from 'zod';

const createMarketplacesLikesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Marketplace Like Schema',
    }
);
const deleteMarketplacesLikesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceLikeId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Marketplace Like Schema',
    }
);
const getAllMarketplacesLikesSchema = z.strictObject(
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

const getOneByIdMarketplacesLikesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceLikeId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Like Schema',
    }
);

const updateMarketplacesLikesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceLikeId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Marketplace Like Schema',
    }
);

const marketplacesLikesSchemas = {
    createMarketplacesLikesSchema,
    updateMarketplacesLikesSchema,
    deleteMarketplacesLikesSchema,

    getAllMarketplacesLikesSchema,
    getOneByIdMarketplacesLikesSchema,
};

export default marketplacesLikesSchemas;
