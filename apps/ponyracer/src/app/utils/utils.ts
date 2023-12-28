import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { SuiteResult } from 'vest';
import { cloneDeep, set } from 'lodash';

/**
 * Returns the path of a control within a root form group.
 *
 * @param {FormGroup} rootForm - The root form group.
 * @param {string} controlName - The name of the control to find.
 * @param {AbstractControl} control - The control to find.
 * @returns {string} - The path of the control within the root form group.
 */
function getControlPath(
  rootForm: FormGroup,
  controlName: string,
  control: AbstractControl,
): string {
  const keys = Object.keys(rootForm.controls);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    const ctrl = rootForm.get(key);
    if (ctrl instanceof FormGroup) {
      const path = getControlPath(ctrl, controlName, control);
      if (path) {
        return key + '.' + path;
      }
    } else if (ctrl === control) {
      return key;
    }
  }
  return '';
}
/**
 * Returns the path to a control within a form group.
 *
 * @param {FormGroup} formGroup - The form group containing the control.
 * @param {string} controlName - The name of the control.
 * @param {AbstractControl} control - The control to find the path for.
 *
 * @returns {string} The path to the control within the form group.
 */
function getGroupPath(formGroup: FormGroup, controlName: string, control: AbstractControl): string {
  const keys = Object.keys(formGroup.controls);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    const ctrl = formGroup.get(key);
    if (ctrl instanceof FormGroup) {
      const path = getControlPath(ctrl, controlName, control);
      if (path) {
        return key + '.' + path;
      }
    }
    if (ctrl === control) {
      return key;
    }
  }
  return '';
}

/**
 * Finds the control name in a given formGroup.
 *
 * @param {Object | Array<AbstractControl<any, any>>} formGroup - The form group to search in.
 * @param {AbstractControl} control - The control to find the name for.
 * @return {string} - The name of the control in the form group, or an empty string if not found.
 */
function findControlNameInGroup(
  formGroup:
    | {
        [key: string]: AbstractControl<unknown, unknown>;
      }
    | AbstractControl<unknown, unknown>[],
  control: AbstractControl,
): string {
  return Object.keys(formGroup).find((name: string) => control === control.parent?.get(name)) || '';
}

/**
 * Retrieves the form control field name for a given control within a parent form group.
 *
 * @param {FormGroup} rootForm - The root form group containing the control.
 * @param {AbstractControl} control - The control whose field name is retrieved.
 * @returns {string} - The field name of the control within the root form group.
 * @throws {Error} - If the control does not have a parent form group.
 */
export function getFormControlField(rootForm: FormGroup, control: AbstractControl): string {
  const parentFormGroup = control.parent?.controls;
  if (!parentFormGroup) {
    throw new Error('An ngModel should always be wrapped in a parent FormGroup');
  }
  const abstractControlName = findControlNameInGroup(parentFormGroup, control);
  return getControlPath(rootForm, abstractControlName, control);
}

/**
 * Retrieves the field name corresponding to the given AbstractControl in a FormGroup hierarchy.
 *
 * @param {FormGroup} rootForm - The root FormGroup to search in.
 * @param {AbstractControl} control - The AbstractControl to find the field name for.
 * @returns {string} - The field name of the control in the FormGroup hierarchy.
 * @throws {Error} - If the control's parent FormGroup is not found.
 */
export function getFormGroupField(rootForm: FormGroup, control: AbstractControl): string {
  const parentFormGroup = control.parent?.controls;
  if (!parentFormGroup) {
    throw new Error('An ngModelGroup should always be wrapped in a parent FormGroup');
  }
  const abstractControlName = findControlNameInGroup(parentFormGroup, control);
  return getGroupPath(rootForm, abstractControlName, control);
}

/**
 *
 * @param field
 * @param model
 * @param suite
 */
export function createValidator<T>(
  field: string,
  model: T,
  suite: (model: T, field: string) => SuiteResult<string, string>,
): ValidatorFn {
  return (control: AbstractControl) => {
    const mod = cloneDeep(model);
    set(mod as object, field, control.value); // Update the property with path
    const result = suite(mod, field);
    const errors = result.getErrors()[field];
    return errors ? { error: errors[0], errors } : null;
  };
}
