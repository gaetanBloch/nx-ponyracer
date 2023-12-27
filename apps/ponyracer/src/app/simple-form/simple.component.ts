import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnRadioComponent, BrnRadioGroupComponent } from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioDirective,
  HlmRadioGroupDirective,
  HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm';
import { HlmLargeDirective, HlmSmallDirective } from '@spartan-ng/ui-typography-helm';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from './product.service';
import { AddressComponent } from '../address/address.component';
import { BrnCheckboxComponent } from '@spartan-ng/ui-checkbox-brain';
import { HlmCheckboxCheckIconComponent, HlmCheckboxDirective } from '@spartan-ng/ui-checkbox-helm';
import { FormDirective } from '../directives/form.directive';
import { LukeService } from '../services/luke.service';
import { debounceTime, filter, switchMap } from 'rxjs';
import { FormModel } from './form.model';
import { PhonenumbersComponent } from '../phonenumbers/phonenumbers.component';
import { AddressModel } from '../address/address.model';
import { purchaseFormValidations } from '../validation/purcharse.validation';

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
    AddressComponent,
    HlmLargeDirective,
    BrnCheckboxComponent,
    HlmCheckboxDirective,
    HlmCheckboxCheckIconComponent,
    FormDirective,
    PhonenumbersComponent,
  ],
  templateUrl: './simple.component.html',
  styleUrl: './simple.component.scss',
  providers: [ProductService, FormDirective],
})
export class SimpleComponent {
  protected readonly formValue = signal<FormModel>({});
  protected readonly formDirty = signal<boolean>(false);
  protected readonly formValid = signal<boolean>(false);
  protected readonly billingAddress = signal<AddressModel>({});
  private readonly productService = inject(ProductService);
  public readonly products = toSignal(this.productService.getAll());
  private readonly lukeService = inject(LukeService);
  private readonly viewModel = computed(() => {
    return {
      formValue: this.formValue(),
      overEighteen: (this.formValue().age || 0) >= 18,
      billingSameAsShipping: this.formValue().addresses?.shippingSameAsBilling,
      genderOther: this.formValue().gender === 'other',
      billingAddress: this.formValue().addresses?.billingAddress || this.billingAddress(),
    };
  });

  constructor() {
    const firstName = computed(() => this.formValue().firstName);
    const lastName = computed(() => this.formValue().lastName);

    effect(
      () => {
        if (firstName() === 'gaetan') {
          this.formValue.update(v => ({
            ...v,
            gender: 'male',
          }));
        }
        if (firstName() === 'gaetan' && lastName() === 'bloch') {
          this.formValue.update(v => ({
            ...v,
            age: 34,
            passwords: {
              password: '123456',
              confirmPassword: '123456',
            },
          }));
        }
      },
      { allowSignalWrites: true },
    );

    // Luke Case
    const luke = toSignal(
      toObservable(firstName).pipe(
        debounceTime(500),
        filter(v => v === 'Luke'),
        switchMap(() => this.lukeService.getLuke()),
      ),
    );
    effect(
      () => {
        this.formValue.update(v => ({
          ...v,
          ...luke(),
        }));
      },
      { allowSignalWrites: true },
    );

    this.formValue.update(v => ({
      ...v,
      phoneNumbers: {
        addValue: '',
        '0': '1234567890',
        '1': '0987654321',
      },
    }));
  }

  get vm() {
    return this.viewModel();
  }

  setFormValue(value: FormModel) {
    this.formValue.set(value);
    if (value.addresses?.billingAddress) {
      this.billingAddress.set(value.addresses?.billingAddress);
    }
  }

  onSubmit() {
    console.log(purchaseFormValidations(this.formValue(), 'emergencyContact').errors);
  }
}
