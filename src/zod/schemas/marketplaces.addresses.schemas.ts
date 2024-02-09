import { ObjectId } from 'bson';
import { z } from 'zod';

const createMarketplacesAddressesSchema = z.strictObject(
    {
        body: z.strictObject({
            streetAddress: z.string(),
            postalCode: z.string(),
            country: z.strictObject({
                name: z.string(),
                iso3: z.string(),
                iso2: z.string(),
            }),
            state: z
                .strictObject({
                    name: z.string(),
                    stateCode: z.string(),
                })
                .optional(),
            city: z
                .strictObject({
                    name: z.string(),
                })
                .optional(),
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
        description: 'Create Marketplace Schema',
    }
);
const deleteMarketplacesAddressesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceAddressId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Marketplace Schema',
    }
);
const getAllMarketplacesAddressesSchema = z.strictObject(
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

const getOneByIdMarketplacesAddressesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceAddressId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Schema',
    }
);

const updateMarketplacesAddressesSchema = z.strictObject(
    {
        body: z.strictObject({
            streetAddress: z.string(),
            postalCode: z.string(),
            country: z.strictObject({
                name: z.string(),
                iso3: z.string(),
                iso2: z.string(),
            }),
            state: z
                .strictObject({
                    name: z.string(),
                    stateCode: z.string(),
                })
                .optional(),
            city: z
                .strictObject({
                    name: z.string(),
                })
                .optional(),
        }),
        query: z.strictObject({
            marketplaceAddressId: z
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
        description: 'Update Marketplace Schema',
    }
);

const marketplacesAddressesSchemas = {
    createMarketplacesAddressesSchema,
    updateMarketplacesAddressesSchema,
    deleteMarketplacesAddressesSchema,

    getAllMarketplacesAddressesSchema,
    getOneByIdMarketplacesAddressesSchema,
};

export default marketplacesAddressesSchemas;
