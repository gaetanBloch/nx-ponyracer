import { AddressModel } from '../address/address.model';
import { PhonenumberModel } from '../phonenumbers/phonenumber.model';

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
  phoneNumbers: PhonenumberModel;
}>;
