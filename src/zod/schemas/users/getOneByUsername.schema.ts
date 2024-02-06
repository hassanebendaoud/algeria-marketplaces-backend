import { z } from 'zod';

const getOneByIdSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            userUsername: z.string(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One User Schema',
    }
);

export default getOneByIdSchema;
