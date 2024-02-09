import { ObjectId } from 'bson';
import { z } from 'zod';

const createProductsCommentsSchema = z.strictObject(
    {
        body: z.strictObject({
            title: z.string(),
            content: z.string(),
        }),
        query: z.strictObject({
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Product Comment Schema',
    }
);
const deleteProductsCommentsSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productCommentId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Product Comment Schema',
    }
);
const getAllProductsCommentsSchema = z.strictObject(
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

const getOneByIdProductsCommentsSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productCommentId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Product Comment Schema',
    }
);

const updateProductsCommentsSchema = z.strictObject(
    {
        body: z.strictObject({
            title: z.string(),
            content: z.string(),
        }),
        query: z.strictObject({
            productCommentId: z.string().refine((val) => ObjectId.isValid(val)),
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Product Comment Schema',
    }
);

const productsCommentsSchemas = {
    createProductsCommentsSchema,
    updateProductsCommentsSchema,
    deleteProductsCommentsSchema,

    getAllProductsCommentsSchema,
    getOneByIdProductsCommentsSchema,
};

export default productsCommentsSchemas;
