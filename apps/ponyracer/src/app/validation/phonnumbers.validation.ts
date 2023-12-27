import { each, enforce, test } from 'vest';
import { PhonenumberModel } from '../phonenumbers/phonenumber.model';

export function phonenumberValidations(model: PhonenumberModel | undefined, field: string): void {
  const phonenumbers = model?.values ? Object.values(model.values) : [];
  test(`${field}`, 'At least one phone number is required', () => {
    enforce(phonenumbers.length).greaterThan(0);
  });
  each(phonenumbers, (phonenumber, index) => {
    test(`${field}.values.${index}`, 'Phone number is required', () => {
      enforce(phonenumber).isNotBlank();
    });
  });
}
