import { Component, ContentChild, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel, NgModelGroup } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[angular-monorepo-control-wrapper]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-wrapper.component.html',
  styleUrl: './control-wrapper.component.scss',
})
export class ControlWrapperComponent {
  @ContentChild(NgModel) ngModel?: NgModel;
  public readonly ngModelGroup: NgModelGroup | null = inject(NgModelGroup, {
    optional: true,
    self: true,
  });

  @HostBinding('class.input-wrapper--invalid')
  public get invalid() {
    return !!(
      (this.ngModel?.control?.errors && this.ngModel?.touched) ||
      (this.ngModelGroup?.control?.errors && this.ngModelGroup.touched)
    );
  }

  controlErrors() {
    return this.ngModel?.control?.errors?.['errors'] as Array<string>;
  }

  groupErrors() {
    return this.ngModelGroup?.control?.errors?.['errors'] as Array<string>;
  }
}
