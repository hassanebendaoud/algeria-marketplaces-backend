import { z } from 'zod';

const getOneByIdSchema = z.strictObject(
  {
    body: z.strictObject({}),
    query: z.strictObject({
      marketplaceUsername: z.string(),
    }),
    params: z.strictObject({}),
  },
  {
    description: "Get One Marketplace Schema",
  }
);

export default getOneByIdSchema;