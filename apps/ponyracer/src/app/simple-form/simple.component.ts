import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnRadioComponent, BrnRadioGroupComponent } from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioDirective,
  HlmRadioGroupDirective,
  HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm';
import { HlmSmallDirective } from '@spartan-ng/ui-typography-helm';

type FormModel = {
  firstName?: string;
  lastName?: string;
  age?: number;
  emergencyContact?: string;
  passwords: {
    password?: string;
    confirmPassword?: string;
  };
  gender: 'male' | 'female' | 'other';
};

@Component({
  selector: 'angular-monorepo-simple',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    BrnRadioGroupComponent,
    BrnRadioComponent,
    HlmRadioIndicatorComponent,
    HlmRadioDirective,
    HlmRadioGroupDirective,
    HlmSmallDirective,
  ],
  templateUrl: './simple.component.html',
  styleUrl: './simple.component.scss',
})
export class SimpleComponent {
  @ViewChild('form') protected ngForm!: NgForm;
  protected formValue: FormModel = {
    passwords: {},
    gender: 'male',
  };
}
