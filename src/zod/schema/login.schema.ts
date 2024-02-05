import { z } from 'zod';

const loginSchema = z.strictObject({
  body: z.strictObject({
    username: z.string(),
    password: z.string().min(6).max(100),
  }),
  query: z.object({}),
  params: z.object({}),
});

export default loginSchema;
