import { z } from 'zod';

const getAllSchema = z.strictObject(
  {
    body: z.strictObject({}),
    query: z.strictObject({
      page: z.string(),
      size: z.string(),
    }),
    params: z.strictObject({}),
  },
  {
    description: "Get All Marketplaces Schema",
  }
);

export default getAllSchema;