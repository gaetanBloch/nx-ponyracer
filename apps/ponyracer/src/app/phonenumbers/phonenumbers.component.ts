import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmLargeDirective } from '@spartan-ng/ui-typography-helm';
import { FormsModule } from '@angular/forms';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { templateDrivenFormsViewProviders } from '../simple-form/template-driven.forms';

function arrayToRecord(phonenumbers: string[]): Record<string, string> {
  return phonenumbers.reduce((acc, phoneNumber, currentIndex) => {
    return {
      ...acc,
      [currentIndex]: phoneNumber,
    };
  }, {});
}

@Component({
  selector: 'angular-monorepo-phonenumbers',
  standalone: true,
  imports: [
    CommonModule,
    HlmLabelDirective,
    HlmLargeDirective,
    FormsModule,
    HlmInputDirective,
    HlmButtonDirective,
    KeyValuePipe,
  ],
  templateUrl: './phonenumbers.component.html',
  styleUrl: './phonenumbers.component.scss',
  viewProviders: [templateDrivenFormsViewProviders],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhonenumbersComponent {
  @Input({ required: true }) public phoneNumbers: Record<string, string> = {};
  protected addValue = '';

  add() {
    const phonenumbers = [...Object.values(this.phoneNumbers || {}), this.addValue];
    this.phoneNumbers = arrayToRecord(phonenumbers);
    this.addValue = '';
  }

  removePhone(key: string) {
    const phonenumbers = Object.values(this.phoneNumbers!).filter(
      (_, index) => index !== Number(key),
    );
    this.phoneNumbers = arrayToRecord(phonenumbers);
  }
}
