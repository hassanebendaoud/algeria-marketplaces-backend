import { ObjectId } from 'bson';
import { z } from 'zod';

const createMarketplacesContactsInformationSchema = z.strictObject(
    {
        body: z.strictObject({
            name: z.string(),
            emails: z.array(
                z.strictObject({
                    value: z.string().email(),
                })
            ),
            phoneNumbers: z.array(
                z.strictObject({
                    countryCode: z.string(),
                    dialCode: z.string(),
                    format: z.string(),
                    name: z.string(),
                    value: z.string(),
                    formattedValue: z.string(),
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
        description: 'Create Marketplace Contact Information Schema',
    }
);
const deleteMarketplacesContactsInformationSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceContactInformationId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Marketplace Contact Information Schema',
    }
);
const getAllMarketplacesContactsInformationSchema = z.strictObject(
    {
        body: z.strictObject({
            name: z.string(),
            emails: z.array(
                z.strictObject({
                    value: z.string(),
                })
            ),
            phoneNumbers: z.array(
                z.strictObject({
                    countryCode: z.string(),
                    dialCode: z.string(),
                    format: z.string(),
                    name: z.string(),
                    value: z.string(),
                    formattedValue: z.string(),
                })
            ),
        }),
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

const getOneByIdMarketplacesContactsInformationSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceContactInformationId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Contact Information Schema',
    }
);

const updateMarketplacesContactsInformationSchema = z.strictObject(
    {
        body: z.strictObject({
            star: z.number().min(1).max(5),
            content: z.string(),
        }),
        query: z.strictObject({
            marketplaceContactInformationId: z
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
        description: 'Update Marketplace Contact Information Schema',
    }
);

const marketplacesContactsInformationSchemas = {
    createMarketplacesContactsInformationSchema,
    updateMarketplacesContactsInformationSchema,
    deleteMarketplacesContactsInformationSchema,

    getAllMarketplacesContactsInformationSchema,
    getOneByIdMarketplacesContactsInformationSchema,
};

export default marketplacesContactsInformationSchemas;
