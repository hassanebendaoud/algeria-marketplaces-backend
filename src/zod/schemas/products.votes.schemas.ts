import { ObjectId } from 'bson';
import { z } from 'zod';

const createProductsVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Product Vote Schema',
    }
);
const deleteProductsVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productVoteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Product Vote Schema',
    }
);
const getAllProductsVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            page: z.string(),
            size: z.string(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get All Products Schema',
    }
);

const getOneByIdProductsVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productVoteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Product Vote Schema',
    }
);

const updateProductsVotesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productVoteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Product Vote Schema',
    }
);

const productsVotesSchemas = {
    createProductsVotesSchema,
    updateProductsVotesSchema,
    deleteProductsVotesSchema,

    getAllProductsVotesSchema,
    getOneByIdProductsVotesSchema,
};

export default productsVotesSchemas;
