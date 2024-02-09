import { ObjectId } from 'bson';
import { z } from 'zod';

const createProductsFavoritesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Product Favorite Schema',
    }
);
const deleteProductsFavoritesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productFavoriteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Product Favorite Schema',
    }
);
const getAllProductsFavoritesSchema = z.strictObject(
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

const getOneByIdProductsFavoritesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productFavoriteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Product Favorite Schema',
    }
);

const updateProductsFavoritesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productFavoriteId: z
                .string()
                .refine((val) => ObjectId.isValid(val)),
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Product Favorite Schema',
    }
);

const productsFavoritesSchemas = {
    createProductsFavoritesSchema,
    updateProductsFavoritesSchema,
    deleteProductsFavoritesSchema,

    getAllProductsFavoritesSchema,
    getOneByIdProductsFavoritesSchema,
};

export default productsFavoritesSchemas;
