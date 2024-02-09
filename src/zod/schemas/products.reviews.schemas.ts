import { ObjectId } from 'bson';
import { z } from 'zod';

const createProductsReviewsSchema = z.strictObject(
    {
        body: z.strictObject({
            star: z.number().min(1).max(5),
            content: z.string(),
        }),
        query: z.strictObject({
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Create Product Review Schema',
    }
);
const deleteProductsReviewsSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productReviewId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete Product Review Schema',
    }
);
const getAllProductsReviewsSchema = z.strictObject(
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

const getOneByIdProductsReviewsSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productReviewId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Product Review Schema',
    }
);

const updateProductsReviewsSchema = z.strictObject(
    {
        body: z.strictObject({
            star: z.number().min(1).max(5),
            content: z.string(),
        }),
        query: z.strictObject({
            productReviewId: z.string().refine((val) => ObjectId.isValid(val)),
            productId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update Product Review Schema',
    }
);

const productsReviewsSchemas = {
    createProductsReviewsSchema,
    updateProductsReviewsSchema,
    deleteProductsReviewsSchema,

    getAllProductsReviewsSchema,
    getOneByIdProductsReviewsSchema,
};

export default productsReviewsSchemas;
