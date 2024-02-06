import { ObjectId } from 'bson';
import { z } from 'zod';

const createSchema = z.strictObject(
  {
    body: z.strictObject({
      name: z.string(),
      username: z.string(),
      description: z.string(),

      User: z.string().refine((val) => ObjectId.isValid(val)),
    }),
    query: z.strictObject({}),
    params: z.strictObject({}),
  },
  {
    description: "Create Marketplace Schema",
  }
);

export default createSchema;