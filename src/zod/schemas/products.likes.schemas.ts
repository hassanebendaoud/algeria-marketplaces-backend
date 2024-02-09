import { ObjectId } from 'bson';
import { z } from 'zod';

const createProductsLikesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Product Like Schema',
    }
);
const deleteProductsLikesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productLikeId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Product Like Schema',
    }
);
const getAllProductsLikesSchema = z.strictObject(
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

const getOneByIdProductsLikesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productLikeId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Product Like Schema',
    }
);

const updateProductsLikesSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productLikeId: z.string().refine((val) => ObjectId.isValid(val)),
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Product Like Schema',
    }
);

const productsLikesSchemas = {
    createProductsLikesSchema,
    updateProductsLikesSchema,
    deleteProductsLikesSchema,

    getAllProductsLikesSchema,
    getOneByIdProductsLikesSchema,
};

export default productsLikesSchemas;
