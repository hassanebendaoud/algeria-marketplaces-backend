import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string().min(6).max(100),
  }),
});

export default loginSchema;
