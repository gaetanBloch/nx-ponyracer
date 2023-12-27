import { DeepRequired } from '../utils/template-driven.forms';

export type AddressModel = Partial<{
  street: string;
  zipcode: string;
  city: string;
  number: string;
  country: string;
}>;

export const addressShape: DeepRequired<AddressModel> = {
  street: '',
  number: '',
  city: '',
  zipcode: '',
  country: '',
};
