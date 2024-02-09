import { ObjectId } from 'bson';
import { z } from 'zod';

const createMarketplacesSocialMediasSchema = z.strictObject(
    {
        body: z.strictObject({
            name: z.string(),
            URLs: z.array(
                z.strictObject({
                    id: z.string().refine((val) => ObjectId.isValid(val)),
                    name: z.string(),
                    website: z.string(),
                    username: z.string(),
                })
            ),
        }),
        query: z.strictObject({
            marketplaceId: z
                .union([
                    z.string().refine((val) => ObjectId.isValid(val)),
                    z.array(z.string().refine((val) => ObjectId.isValid(val))),
                ])
                .optional(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Marketplace SocialMedia Schema',
    }
);
const deleteMarketplacesSocialMediasSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceSocialMediaId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Marketplace SocialMedia Schema',
    }
);
const getAllMarketplacesSocialMediasSchema = z.strictObject(
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

const getOneByIdMarketplacesSocialMediasSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceSocialMediaId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace SocialMedia Schema',
    }
);

const updateMarketplacesSocialMediasSchema = z.strictObject(
    {
        body: z.strictObject({
            name: z.string(),
            URLs: z.array(
                z.strictObject({
                    id: z.string(),
                    name: z.string(),
                    website: z.string(),
                    username: z.string(),
                })
            ),
        }),
        query: z.strictObject({
            marketplaceSocialMediaId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
            marketplaceId: z
                .union([
                    z.string().refine((val) => ObjectId.isValid(val)),
                    z.array(z.string().refine((val) => ObjectId.isValid(val))),
                ])
                .optional(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Marketplace SocialMedia Schema',
    }
);

const marketplacesSocialMediasSchemas = {
    createMarketplacesSocialMediasSchema,
    updateMarketplacesSocialMediasSchema,
    deleteMarketplacesSocialMediasSchema,

    getAllMarketplacesSocialMediasSchema,
    getOneByIdMarketplacesSocialMediasSchema,
};

export default marketplacesSocialMediasSchemas;
