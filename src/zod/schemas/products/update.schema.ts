import { ObjectId } from 'bson';
import { z } from 'zod';

const updateSchema = z.strictObject(
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

export default updateSchema;
