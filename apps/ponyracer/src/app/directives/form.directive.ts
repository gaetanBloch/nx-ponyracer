import { Directive, inject, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, map } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'form',
  standalone: true,
})
export class FormDirective {
  // Inject its own `NgForm` instance
  private readonly ngForm = inject(NgForm, { self: true });
  @Output() public readonly formValueChange = this.ngForm.form.valueChanges.pipe(debounceTime(0));
  @Output() public readonly dirtyChange = this.formValueChange.pipe(map(() => this.ngForm.dirty!));
  @Output() public readonly validChange = this.formValueChange.pipe(map(() => this.ngForm.valid!));
}
