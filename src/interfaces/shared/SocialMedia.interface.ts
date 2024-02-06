import { ObjectId } from 'mongoose';

import { UserInterface } from '@interfaces/users/User.interface';

export interface URLSocialMediaInterface {
    id: string;
    name: string;
    website: string;
    username: string;
}

export interface SocialMediaInterface {
    name: string;
    URLs: URLSocialMediaInterface[];

    User: UserInterface | ObjectId | string;

    createdAt: Date;
    updatedAt: Date;
}
