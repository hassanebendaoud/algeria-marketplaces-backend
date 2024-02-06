import { z } from 'zod';

const getOneByIdSchema = z.strictObject(
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

export default getOneByIdSchema;
