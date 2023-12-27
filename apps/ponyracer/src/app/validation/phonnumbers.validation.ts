import { each, enforce, test } from 'vest';
import { PhonenumberModel } from '../phonenumbers/phonenumber.model';

export function phonenumberValidations(model: PhonenumberModel | undefined, field: string): void {
  const numbers = model?.values ? Object.values(model.values) : [];
  test(`${field}.values`, 'At least one phone number is required', () => {
    enforce(numbers.length).greaterThan(0);
  });
  each(numbers, (number, index) => {
    test(`${field}.values[${index}]`, 'Phone number is required', () => {
      enforce(number).isNotBlank();
    });
    test(`${field}.values[${index}]`, 'Phone number must be a valid number', () => {
      enforce(number).matches(/^\d+$/);
    });
  });
}
