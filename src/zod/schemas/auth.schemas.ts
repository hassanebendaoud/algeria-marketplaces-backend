import { z } from 'zod';

const loginSchema = z.strictObject(
    {
        body: z.strictObject({
            username: z.string(),
            password: z.string().min(6).max(100),
        }),
        query: z.strictObject({}),
        params: z.strictObject({}),
    },
    {
        description: 'Login schema',
    }
);

const registerSchema = z.strictObject(
    {
        body: z.strictObject({
            firstName: z.string().min(3).max(100),
            lastName: z.string().min(3).max(100),
            username: z.string(),
            email: z.string().email(),
            password: z.string().min(6).max(100),
            gender: z.string().optional(),
            dateBirthday: z.string().optional(),
        }),
        query: z.strictObject({}),
        params: z.strictObject({}),
    },
    {
        description: 'Register Schema',
    }
);

const authSchemas = {
    loginSchema,
    registerSchema,
};

export default authSchemas;
