import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressModel } from './address.model';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { templateDrivenFormsViewProviders } from '../simple-form/template-driven.forms';

@Component({
  selector: 'angular-monorepo-address',
  standalone: true,
  imports: [CommonModule, HlmInputDirective, HlmLabelDirective, ReactiveFormsModule, FormsModule],
  viewProviders: [templateDrivenFormsViewProviders],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Input({ required: true }) address?: AddressModel;
}
