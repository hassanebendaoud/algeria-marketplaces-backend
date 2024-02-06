import { ObjectId } from 'bson';
import { z } from 'zod';

const createSchema = z.strictObject(
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

export default createSchema;
