import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ValidationErrorsComponent } from 'ngx-valdemort';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { SvgIconComponent } from '@geode/components';

interface LoginForm {
  login: string;
  password: string;
}

@Component({
  selector: 'angular-monorepo-login',
  standalone: true,
  imports: [
    CommonModule,
    HlmInputDirective,
    HlmLabelDirective,
    ReactiveFormsModule,
    FormsModule,
    HlmButtonDirective,
    ValidationErrorsComponent,
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    HlmIconComponent,
    SvgIconComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  authentificationError = signal(false);

  @ViewChild(NgForm) loginForm!: NgForm;

  protected credentials: LoginForm = {
    login: '',
    password: '',
  };

  login() {
    this.userService
      // .login(this.loginForm.value.login, this.loginForm.value.password)
      .login(this.credentials.login, this.credentials.password)
      .pipe(tap(console.log))
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.authentificationError.set(true),
      });
  }
}
