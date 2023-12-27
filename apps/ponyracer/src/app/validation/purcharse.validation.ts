import { create, enforce, only, test, omitWhen } from 'vest';
import { FormModel } from '../simple-form/form.model';
import { addressValidations } from './address.validations';
import { phonenumberValidations } from './phonnumbers.validation';

export const purchaseFormValidations = create((model: FormModel, field: string) => {
  only(field);
  test('firstName', 'First name is required', () => {
    enforce(model.firstName).isNotBlank();
  });
  test('lastName', 'Last name is required', () => {
    enforce(model.lastName).isNotBlank();
  });
  test('age', 'Age is required', () => {
    enforce(model.age).isNotBlank();
  });
  // Conditional validations
  omitWhen((model.age || 0) >= 18, () => {
    test('emergencyContact', 'Emergency contact is required', () => {
      enforce(model.emergencyContact).isNotBlank();
    });
  });
  test('gender', 'Gender is required', () => {
    enforce(model.gender).isNotBlank();
  });
  // Conditional validations
  omitWhen(model.gender !== 'other', () => {
    test('genderOther', 'When gender is other you have to fill the other gender field', () => {
      enforce(model.genderOther).isNotBlank();
    });
  });
  test('productId', 'Product is required', () => {
    enforce(model.productId).isNotBlank();
  });

  // nested validations
  test('addresses.shippingAddress.street', 'Street is required', () => {
    enforce(model.addresses?.shippingAddress?.street).isNotBlank();
  });
  test('addresses.shippingAddress.city', 'City is required', () => {
    enforce(model.addresses?.shippingAddress?.city).isNotBlank();
  });
  test('addresses.shippingAddress.zipCode', 'Zipcode is required', () => {
    enforce(model.addresses?.shippingAddress?.zipcode).isNotBlank();
  });
  test('addresses.shippingAddress.number', 'Number is required', () => {
    enforce(model.addresses?.shippingAddress?.number).isNotBlank();
  });
  test('addresses.shippingAddress.country', 'Country is required', () => {
    enforce(model.addresses?.shippingAddress?.country).isNotBlank();
  });

  // Passwords
  test('passwords.password', 'Password is required', () => {
    enforce(model.passwords?.password).isNotBlank();
  });
  omitWhen(!model.passwords?.password, () => {
    test('passwords.confirmPassword', 'Confirm password is required', () => {
      enforce(model.passwords?.confirmPassword).isNotBlank();
    });
  });
  omitWhen(!model.passwords?.password || !model.passwords?.confirmPassword, () => {
    test('passwords', 'Passwords must match', () => {
      enforce(model.passwords?.password).equals(model.passwords?.confirmPassword);
    });
  });

  addressValidations(model.addresses?.shippingAddress, 'addresses.shippingAddress');
  omitWhen(model.addresses?.shippingSameAsBilling as boolean, () => {
    addressValidations(model.addresses?.billingAddress, 'addresses.billingAddress');
    test('addresses', 'Billing address appears to be as shipping address', () => {
      enforce(JSON.stringify(model.addresses?.shippingAddress)).notEquals(
        JSON.stringify(model.addresses?.billingAddress),
      );
    });
  });

  phonenumberValidations(model?.phonenumbers, 'phonenumbers');
});
