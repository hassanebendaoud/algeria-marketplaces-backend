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
