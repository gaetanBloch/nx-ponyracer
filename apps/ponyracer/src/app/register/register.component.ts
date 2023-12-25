import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  DefaultValidationErrorsDirective,
  ValidationErrorDirective,
  ValidationErrorsComponent,
} from 'ngx-valdemort';
import { UserService } from '../user/user.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { radixExclamationTriangle } from '@ng-icons/radix-icons';

interface RegisterForm {
  login: FormControl<string>;
  passwordGroup: FormGroup<{
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;
  birthYear: FormControl<number | null>;
}

// interface RegisterForm {
//   login: string;
//   password: string;
//   birthYear: number | null;
// }

@Component({
  selector: 'angular-monorepo-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    DefaultValidationErrorsDirective,
    ValidationErrorDirective,
    ValidationErrorsComponent,
    HlmAlertDirective,
    HlmIconComponent,
    HlmAlertIconDirective,
    HlmAlertDescriptionDirective,
    HlmAlertTitleDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideIcons({ radixExclamationTriangle })],
})
export class RegisterComponent {
  fb = inject(NonNullableFormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  response = signal<User | null>(null);

  // State
  registrationFailed = signal(false);

  loginCtrl = this.fb.control('', {
    validators: [Validators.required, Validators.minLength(3)],
    updateOn: 'change',
  });
  passwordCtrl = this.fb.control('', {
    validators: [Validators.required, Validators.minLength(3)],
    updateOn: 'change',
  });
  confirmPasswordCtrl = this.fb.control('', {
    validators: [Validators.required, Validators.minLength(3)],
    updateOn: 'change',
  });
  passwordGroup = this.fb.group(
    {
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    },
    {
      validators: RegisterComponent.passwordMatch,
      updateOn: 'blur',
    },
  );
  birthYearCtrl = this.fb.control(1901, {
    validators: [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear()),
      RegisterComponent.yearValid,
    ],
    updateOn: 'change',
  });

  registerForm = this.fb.group<RegisterForm>({
    login: this.loginCtrl,
    passwordGroup: this.passwordGroup,
    birthYear: this.birthYearCtrl,
  });

  // registerForm = this.fb.group<RegisterForm>({
  //   login: '',
  //   password: '',
  //   birthYear: null as number | null,
  // });
  protected readonly JSON = JSON;

  static passwordMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.value.password;
    const confirm = group.value.confirmPassword;
    return password === confirm ? null : { matchingError: true };
  }

  static yearValid(control: AbstractControl): ValidationErrors | null {
    const year = control.value;
    console.log(year);
    return year >= 1900 && year <= new Date().getFullYear() ? null : { invalidYear: true };
  }

  register() {
    this.userService
      .register(this.loginCtrl.value, this.passwordCtrl.value, this.birthYearCtrl.value)
      .pipe(
        tap(user => {
          console.log(user);
          this.registrationFailed.set(false);
          this.response.set(user);
        }),
      )
      .subscribe({
        next: user => {
          this.registrationFailed.set(false);
          this.response.set(user);
          this.router.navigate(['/']);
        },
        error: err => {
          console.error(err);
          this.registrationFailed.set(true);
        },
      });
  }
}
