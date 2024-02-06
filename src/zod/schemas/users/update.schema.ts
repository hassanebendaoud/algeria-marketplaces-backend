import { ObjectId } from 'bson';
import { z } from 'zod';

const updateSchema = z.strictObject(
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
        query: z.strictObject({
            userId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Update User Schema',
    }
);

export default updateSchema;
