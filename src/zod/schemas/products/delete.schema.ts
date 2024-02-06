import { ObjectId } from 'bson';
import { z } from 'zod';

const deleteSchema = z.strictObject(
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

export default deleteSchema;
