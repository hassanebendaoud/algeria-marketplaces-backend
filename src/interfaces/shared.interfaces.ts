import { ObjectId } from 'mongoose';

import { UserInterface } from '@interfaces/users.interface';

export interface CountryAddressInterface {
    name: string;
    iso3: string;
    iso2: string;
}

export interface StateAddressInterface {
    name: string;
    stateCode: string;
}

export interface CityAddressInterface {
    name: string;
}

export interface AddressInterface {
    streetAddress: string;
    postalCode: string;

    country: CountryAddressInterface;
    state?: StateAddressInterface;
    city?: CityAddressInterface;

    createdAt: Date;
    updatedAt: Date;
}

export interface CommentInterface {
    id: string;

    title: string;
    content: string;

    User: UserInterface | ObjectId | string;

    createdAt: Date;
    updatedAt: Date;
}

export interface EmailContactInformationInterface {
    value: string;
}

export interface PhoneNumberContactInformationInterface {
    countryCode: string;
    dialCode: string;
    format: string;
    name: string;
    value: string;
    formattedValue: string;
}

export interface ContactInformationInterface {
    id: ObjectId | string;
    name: string;
    emails: EmailContactInformationInterface[];
    phoneNumbers: PhoneNumberContactInformationInterface[];

    User: ObjectId | string;

    createdAt: Date;
    updatedAt: Date;
}

export interface FileInterface {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;

    User: UserInterface | ObjectId | string;

    createdAt: Date;
    updatedAt: Date;
}

export interface InteractionInterface {
    User: UserInterface | ObjectId | string;

    createdAt: Date;
    updatedAt: Date;
}

export interface ReviewInterface {
    id: string;

    start: number;
    content: string;

    User: UserInterface | ObjectId | string;

    createdAt: Date;
    updatedAt: Date;
}

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
