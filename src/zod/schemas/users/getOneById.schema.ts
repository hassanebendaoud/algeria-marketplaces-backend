import { ObjectId } from 'bson';
import { z } from 'zod';

const getOneByIdSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            userId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One User Schema',
    }
);

export default getOneByIdSchema;
