import { ObjectId } from 'bson';
import { z } from 'zod';

const createUserSchema = z.strictObject(
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
const deleteUserSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            userId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Delete User Schema',
    }
);
const getAllUsersSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            page: z.string(),
            size: z.string(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get All Users Schema',
    }
);
const getOneByIdUserSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            userId: z.string().refine((val) => ObjectId.isValid(val)),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One User Schema',
    }
);

const getOneByUsernameUserSchema = z.strictObject(
    {
        body: z.strictObject({}),
        query: z.strictObject({
            userUsername: z.string(),
        }),
        params: z.strictObject({}),
    },
    {
        description: 'Get One User Schema',
    }
);
const updateUserSchema = z.strictObject(
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

const usersSchemas = {
    createUserSchema,
    deleteUserSchema,
    getAllUsersSchema,
    getOneByIdUserSchema,
    getOneByUsernameUserSchema,
    updateUserSchema,
};

export default usersSchemas;
