import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  }),
});

export default registerSchema;
