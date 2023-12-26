import { Component, inject, ViewChild } from '@angular/core';
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
import { HlmLargeDirective, HlmSmallDirective } from '@spartan-ng/ui-typography-helm';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from './product.service';
import { AddressModel } from '../address/address.model';
import { AddressComponent } from '../address/address.component';
import { BrnCheckboxComponent } from '@spartan-ng/ui-checkbox-brain';
import { HlmCheckboxCheckIconComponent, HlmCheckboxDirective } from '@spartan-ng/ui-checkbox-helm';

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
  productId?: string;
  addresses: {
    shippingAddress: AddressModel;
    billingAddress: AddressModel;
    shippingSameAsBilling?: boolean;
  };
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
    AddressComponent,
    HlmLargeDirective,
    BrnCheckboxComponent,
    HlmCheckboxDirective,
    HlmCheckboxCheckIconComponent,
  ],
  templateUrl: './simple.component.html',
  styleUrl: './simple.component.scss',
  providers: [ProductService],
})
export class SimpleComponent {
  @ViewChild('form') protected ngForm!: NgForm;
  private readonly productService = inject(ProductService);
  public readonly products = toSignal(this.productService.getAll());
  protected formValue: FormModel = {
    passwords: {},
    addresses: {
      shippingAddress: {},
      billingAddress: {},
    },
    gender: 'male',
  };

  logForm() {
    console.log(this.ngForm);
  }
}
