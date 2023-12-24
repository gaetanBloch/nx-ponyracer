import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { SvgIconComponent } from '@geode/components';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'angular-monorepo-home',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, SvgIconComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = inject(Title);

  constructor() {
    this.title.setTitle('Ponyracer - Home');
  }
}
