import { z } from 'zod';

const getOneByIdSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            productUsername: z.string(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Product Schema',
    }
);

export default getOneByIdSchema;
