import { ObjectId } from 'bson';
import { z } from 'zod';

const getOneByIdSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One Marketplace Schema',
    }
);

export default getOneByIdSchema;
