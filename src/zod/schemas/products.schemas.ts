import { ObjectId } from 'bson';
import { z } from 'zod';

const createProductSchema = z.strictObject(
    {
        body: z.strictObject({
            title: z.string(),
            description: z.string(),
            price: z.string(),

            Marketplace: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        query: z.strictObject({}),
        params: z.strictObject({}),
    },
    {
        description: 'Create Product Schema',
    }
);

const deleteProductSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Product Schema',
    }
);
const getAllProductsSchema = z.strictObject(
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

const getOneByIdProductSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Product Schema',
    }
);
const getOneBySlugProductSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productSlug: z.string(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Product Schema',
    }
);

const updateProductSchema = z.strictObject(
    {
        body: z.strictObject({
            title: z.string(),
            description: z.string(),
            price: z.string(),

            Marketplace: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        query: z.strictObject({
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Product Schema',
    }
);

const productSchemas = {
    createProductSchema,
    deleteProductSchema,
    getAllProductsSchema,
    getOneByIdProductSchema,
    getOneBySlugProductSchema,
    updateProductSchema,
};

export default productSchemas;
