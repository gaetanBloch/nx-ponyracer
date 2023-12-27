import { AddressModel, addressShape } from '../address/address.model';
import { PhonenumberModel, phonenumberShape } from '../phonenumbers/phonenumber.model';
import { DeepRequired } from '../utils/template-driven.forms';

export type FormModel = Partial<{
  firstName: string;
  lastName: string;
  age: number;
  emergencyContact: string;
  passwords: Partial<{
    password: string;
    confirmPassword: string;
  }>;
  gender: 'male' | 'female' | 'other';
  genderOther: string;
  productId: string;
  addresses: Partial<{
    shippingAddress: AddressModel;
    billingAddress: AddressModel;
    shippingSameAsBilling: boolean;
  }>;
  phonenumbers: PhonenumberModel;
}>;

export const formShape: DeepRequired<FormModel> = {
  firstName: '',
  lastName: '',
  age: 0,
  emergencyContact: '',
  addresses: {
    shippingAddress: addressShape,
    billingAddress: addressShape,
    shippingSameAsBilling: true,
  },
  passwords: {
    password: '',
    confirmPassword: '',
  },
  phonenumbers: phonenumberShape,
  gender: 'other',
  genderOther: '',
  productId: '',
};
