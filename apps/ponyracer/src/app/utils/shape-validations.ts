import { isDevMode } from '@angular/core';

/**
 * Represents an error that occurs when there is a shape mismatch in a computation or operation.
 * @extends Error
 */
export class ShapeMismatchError extends Error {
  constructor(errorList: string[]) {
    super(`Shape mismatch:\n\n${errorList.join('\n')}\n\n`);
  }
}

/**
 * Validates if the given value matches the specified shape.
 *
 * @param {Record<string, unknown>} val - The value to validate.
 * @param {Record<string, unknown>} shape - The shape definition to match against.
 * @throws {ShapeMismatchError} - Throws a ShapeMismatchError if the value does not match the shape.
 */
export function validateShape(val: Record<string, unknown>, shape: Record<string, unknown>): void {
  if (isDevMode()) {
    const errors = validateFormValue(val, shape);
    if (errors.length) {
      throw new ShapeMismatchError(errors);
    }
  }
}

/**
 * Validates the values of a form based on a given shape object.
 *
 * @param {Record<string, unknown>} formValue - The values of the form.
 * @param {Record<string, unknown>} shape - The shape object defining the expected structure of the form.
 * @param {string} [path=''] - The current path of the form values being validated (used for error messages).
 *
 * @returns {string[]} An array of error messages describing the validation errors.
 */
function validateFormValue(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValue: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shape: Record<string, any>,
  path: string = '',
): string[] {
  const errors: string[] = [];
  for (const key in Object.keys(formValue)) {
    const newPath = path ? `${path}.${key}` : key;
    if (typeof formValue[key] === 'object' && formValue[key] !== null) {
      if ((typeof shape[key] !== 'object' || shape[key] === null) && isNaN(parseFloat(key))) {
        errors.push(`[ngModelGroup] Mismatch: '${newPath}'`);
      }
      errors.push(...validateFormValue(formValue[key], shape[key], newPath));
    } else if ((shape ? !(key in shape) : true) && isNaN(parseFloat(key))) {
      errors.push(`[ngModel] Mismatch '${newPath}'`);
    }
  }
  return errors;
}
