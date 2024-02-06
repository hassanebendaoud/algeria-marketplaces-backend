import { ObjectId } from 'mongoose';

import { UserInterface } from '@interfaces/users/User.interface';

export interface ReviewInterface {
    id: string;

    start: number;
    content: string;

    User: UserInterface | ObjectId | string;

    createdAt: Date;
    updatedAt: Date;
}
