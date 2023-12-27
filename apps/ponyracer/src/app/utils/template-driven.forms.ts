import { Optional, Provider } from '@angular/core';
import { ControlContainer, FormsModule, NgForm, NgModelGroup } from '@angular/forms';
import { FormDirective } from '../directives/form.directive';
import { FormModelDirective } from '../directives/form-model.directive';
import { FormModelGroupDirective } from '../directives/form-model-group.directive';
import { ControlWrapperComponent } from '../control-wrapper/control-wrapper.component';

/**
 * This is borrowed from  [https://github.com/wardbell/ngc-validate/blob/main/src/app/core/form-container-view-provider.ts](https://github.com/wardbell/ngc-validate/blob/main/src/app/core/form-container-view-provider.ts)
 * Thank you so much Ward Bell for your effort!:
 *
 * Provide a ControlContainer to a form component from the
 * nearest parent NgModelGroup (preferred) or NgForm.
 *
 * Required for Reactive Forms as well (unless you write CVA)
 *
 * @example
 * ```
 *   @Component({
 *     ...
 *    viewProviders[ formViewProvider ]
 *   })
 * ```
 * @see Kara's AngularConnect 2017 talk: https://youtu.be/CD_t3m2WMM8?t=1826
 *
 * Without this provider
 * - Controls are not registered with parent NgForm or NgModelGroup
 * - Form-level flags say "untouched" and "valid"
 * - No form-level validation roll-up
 * - Controls still validate, update model, and update their statuses
 * - If within NgForm, no compiler error because ControlContainer is optional for ngModel
 *
 * Note: if the SubForm Component that uses this Provider
 * is not within a Form or NgModelGroup, the provider returns `null`
 * resulting in an error, something like
 * ```
 * preview-fef3604083950c709c52b.js:1 ERROR Error:
 *  ngModelGroup cannot be used with a parent formGroup directive.
 *```
 */
export const formViewProvider: Provider = {
  provide: ControlContainer,
  useFactory: _formViewProviderFactory,
  deps: [
    [new Optional(), NgForm],
    [new Optional(), NgModelGroup],
  ],
};

export function _formViewProviderFactory(ngForm: NgForm, ngModelGroup: NgModelGroup) {
  return ngModelGroup || ngForm || null;
}

/**
 * Variable: templateDrivenFormsViewProviders
 *
 * Description:
 * This variable is an array of view providers used for template-driven forms in Angular.
 * It is used to provide necessary dependencies for template-driven forms.
 *
 * Elements:
 * Each element in the array is an object with the following properties:
 * - provide: Specifies the dependency injection token for a specific provider.
 * - useExisting: Specifies the existing instance of the provider to be used for injection.
 *
 * Usage:
 * This variable is typically used in the providers section of an Angular component's metadata.
 * By including these providers in the component's metadata, the Angular injector will be able
 * to resolve and inject the required dependencies when the component is instantiated.
 *
 * Example Usage:
 * ```typescript
 * import { Component } from '@angular/core';
 * import { ControlContainer, NgForm } from '@angular/forms';
 * import { formViewProvider } from './form-view.provider';
 *
 * @Component({
 *   selector: 'app-my-component',
 *   template: `
 *     <!-- Template-driven form markup -->
 *   `,
 *   providers: [templateDrivenFormsViewProviders]
 * })
 * export class MyComponent {
 *   // Component implementation...
 * }
 * ```
 */
export const templateDrivenFormsViewProviders = [
  { provide: ControlContainer, useExisting: NgForm },
  formViewProvider, // very important if we want nested components with ngModelGroup
];

/**
 * Represents the template-driven forms used in an application.
 *
 * @type {Array}
 * @name templateDrivenForms
 * @property {FormDirective} 0 - The directive used to create forms.
 * @property {FormsModule} 1 - The module that imports the necessary dependencies for template-driven forms.
 * @property {FormModelDirective} 2 - The directive used to create form models.
 * @property {FormModelGroupDirective} 3 - The directive used to create form model groups.
 * @property {ControlWrapperComponent} 4 - The component used to wrap form controls.
 */
export const templateDrivenForms = [
  FormDirective,
  FormsModule,
  FormModelDirective,
  FormModelGroupDirective,
  ControlWrapperComponent,
];

/**
 * Represents a type that makes all properties of a given object type required recursively.
 *
 * @template T - The object type to make all properties required recursively.
 */
export type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};
