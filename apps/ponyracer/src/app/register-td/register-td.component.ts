import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { FormsModule } from '@angular/forms';

interface FormModel {
  firstName?: string;
  login?: string;
  passwords: Partial<{
    password: string;
    confirmPassword: string;
  }>;
}

@Component({
  selector: 'angular-monorepo-register-td',
  standalone: true,
  imports: [CommonModule, HlmLabelDirective, HlmInputDirective, FormsModule],
  templateUrl: './register-td.component.html',
  styleUrl: './register-td.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterTdComponent {
  @ViewChild('registerForm') registerForm!: HTMLFormElement;
  protected formValue: FormModel = {
    passwords: {},
  };
}
