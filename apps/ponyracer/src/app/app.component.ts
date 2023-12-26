import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { SvgIconComponent } from '@geode/components';
import { DecimalPipe } from '@angular/common';
import { DefaultValidationErrorsDirective, ValidationErrorDirective } from 'ngx-valdemort';
import { initFlowbite } from 'flowbite';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HlmButtonDirective,
    SvgIconComponent,
    DecimalPipe,
    DefaultValidationErrorsDirective,
    ValidationErrorDirective,
  ],
  selector: 'angular-monorepo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ponyracer';

  ngOnInit() {
    initFlowbite();
  }
}
