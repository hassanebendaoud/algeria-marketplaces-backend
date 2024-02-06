import { ObjectId } from 'bson';
import { z } from 'zod';

const updateSchema = z.strictObject(
  {
    body: z.strictObject({
      name: z.string().optional(),
      username: z.string().optional(),
      description: z.string().optional(),
    }),
    query: z.strictObject({
      marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
    }),
    params: z.strictObject({}),
  },
  {
    description: "Update Marketplace Schema",
  }
);

export default updateSchema;
