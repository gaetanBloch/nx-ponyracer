import { Directive, inject } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { FormDirective } from './form.directive';
import { createValidator, getFormGroupField } from '../utils/utils';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModelGroup]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: FormModelGroupDirective, multi: true }],
})
export class FormModelGroupDirective implements Validator {
  private readonly formDirective = inject(FormDirective);

  /**
   * Validates a form control using the provided validator function.
   *
   * @param {AbstractControl} control - The form control to be validated.
   * @returns {ValidationErrors | null} - The validation errors, if any; otherwise, null.
   * @throws {Error} - If suite or formValue is not defined in the form directive.
   */
  public validate(control: AbstractControl): ValidationErrors | null {
    const { ngForm, suite, formValue } = this.formDirective;
    if (!suite || !formValue) {
      throw new Error('suite or formValue is not defined');
    }
    const field = getFormGroupField(ngForm.form, control);
    const validator = createValidator(field, formValue, suite);
    return validator(control);
  }
}
