import { Directive, inject } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { createValidator, getFormControlField } from '../utils/utils';
import { FormDirective } from './form.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModel]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: FormModelDirective, multi: true }],
})
export class FormModelDirective implements Validator {
  private readonly formDirective = inject(FormDirective);

  /**
   * Validates a given control and returns any validation errors or `null` if no errors.
   *
   * @param {AbstractControl} control - The control to validate.
   * @return {ValidationErrors | null} - The validation errors, or `null` if no errors.
   * @throws {Error} - If `suite` or `formValue` are missing.
   */
  public validate(control: AbstractControl): ValidationErrors | null {
    const { ngForm, suite, formValue } = this.formDirective;
    if (!suite || !formValue) {
      throw new Error('suite or formValue is missing');
    }
    const field = getFormControlField(ngForm.control, control);
    const validator = createValidator(field, formValue, suite);
    return validator(control);
  }
}
