import { ObjectId } from 'bson';
import { z } from 'zod';

const deleteSchema = z.strictObject(
  {
    body: z.strictObject({}),
    query: z.strictObject({
      marketplaceId: z.string().refine((val) => ObjectId.isValid(val)),
    }),
    params: z.strictObject({}),
  },
  {
    description: "Delete Marketplace Schema",
  }
);

export default deleteSchema;
