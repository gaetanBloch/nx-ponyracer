import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { SvgIconComponent } from '@geode/components';

@Component({
  selector: 'angular-monorepo-home',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, SvgIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
