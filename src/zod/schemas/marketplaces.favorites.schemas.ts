import { ObjectId } from 'bson';
import { z } from 'zod';

const createMarketplacesFavoritesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Marketplace Favorite Schema',
    }
);
const deleteMarketplacesFavoritesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceFavoriteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Marketplace Favorite Schema',
    }
);
const getAllMarketplacesFavoritesSchema = z.strictObject(
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

const getOneByIdMarketplacesFavoritesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceFavoriteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Favorite Schema',
    }
);

const updateMarketplacesFavoritesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceFavoriteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Marketplace Favorite Schema',
    }
);

const marketplacesFavoritesSchemas = {
    createMarketplacesFavoritesSchema,
    updateMarketplacesFavoritesSchema,
    deleteMarketplacesFavoritesSchema,

    getAllMarketplacesFavoritesSchema,
    getOneByIdMarketplacesFavoritesSchema,
};

export default marketplacesFavoritesSchemas;
