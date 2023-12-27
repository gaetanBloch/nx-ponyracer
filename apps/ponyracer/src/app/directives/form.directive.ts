import { booleanAttribute, Directive, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup, NgForm } from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import { SuiteResult } from 'vest';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'form',
  standalone: true,
})
export class FormDirective<T> {
  @Input() public formValue: T | null = null;
  @Input() public suite: ((formaValue: T, field: string) => SuiteResult<string, string>) | null =
    null;
  // Inject its own `NgForm` instance
  public readonly ngForm = inject(NgForm, { self: true });
  @Output() public readonly formValueChange = this.ngForm.form.valueChanges.pipe(debounceTime(0));
  @Output() public readonly dirtyChange = this.formValueChange.pipe(map(() => this.ngForm.dirty!));
  @Output() public readonly validChange = this.formValueChange.pipe(map(() => this.ngForm.valid!));

  constructor() {
    this.ngForm.ngSubmit.subscribe(() => {
      this.ngForm.form.markAllAsTouched();
    });
  }

  @Input()
  public set alwaysValidate(value: boolean | string) {
    if (booleanAttribute(value)) {
      this.ngForm.form.valueChanges.pipe(debounceTime(0)).subscribe(() => {
        this.updateValueAndValidityRecursive(this.ngForm.form);
      });
    }
  }

  private updateValueAndValidityRecursive(control: AbstractControl): void {
    if (control instanceof FormGroup) {
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      Object.values(control.controls).forEach(subControl => {
        this.updateValueAndValidityRecursive(subControl);
      });
    } else {
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
  }
}
