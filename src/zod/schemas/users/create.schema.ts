import { z } from 'zod';

const createSchema = z.strictObject(
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
        description: 'Create User Schema',
    }
);

export default createSchema;
