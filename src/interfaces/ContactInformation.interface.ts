import { Schema } from 'mongoose';

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
  id: Schema.Types.ObjectId | string;
  name: string;
  emails: EmailContactInformationInterface[];
  phoneNumbers: PhoneNumberContactInformationInterface[];

  User: Schema.Types.ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}
