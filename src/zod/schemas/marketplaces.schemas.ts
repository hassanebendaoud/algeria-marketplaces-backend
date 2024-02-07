import { ObjectId } from 'bson';
import { z } from 'zod';

const createMarketplacesSchema = z.strictObject(
    {
        body: z.strictObject({
            name: z.string(),
            username: z.string(),
            description: z.string(),
        }),
        query: z.strictObject({}),
        params: z.strictObject({}),
    },
    {
        description: 'Create Marketplace Schema',
    }
);
const deleteMarketplacesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Marketplace Schema',
    }
);
const getAllMarketplacesSchema = z.strictObject(
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

const getOneByIdMarketplacesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Schema',
    }
);
const getOneBySlugMarketplacesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceSlug: z.string(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Schema',
    }
);
const getOneByUsernameMarketplacesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceUsername: z.string(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Schema',
    }
);
const updateMarketplacesSchema = z.strictObject(
    {
        body: z.strictObject({
            name: z.string().optional(),
            username: z.string().optional(),
            description: z.string().optional(),
        }),
        query: z.strictObject({
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Marketplace Schema',
    }
);

const marketplacesSchemas = {
    createMarketplacesSchema,
    updateMarketplacesSchema,
    deleteMarketplacesSchema,

    getAllMarketplacesSchema,
    getOneByIdMarketplacesSchema,
    getOneBySlugMarketplacesSchema,
    getOneByUsernameMarketplacesSchema,
};

export default marketplacesSchemas;
