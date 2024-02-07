import { ObjectId } from 'bson';

export type ExpressUserType = {
    _id: ObjectId;
    name: string;
    username: string;
    email: string;

    createdAt: Date;
    updatedAt: Date;
};
