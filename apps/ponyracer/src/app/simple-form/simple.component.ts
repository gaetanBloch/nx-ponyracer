import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
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

type FormModel = Partial<{
  firstName: string;
  lastName: string;
  age: number;
  emergencyContact: string;
  passwords: Partial<{
    password: string;
    confirmPassword: string;
  }>;
  gender: 'male' | 'female' | 'other';
  productId: string;
  addresses: Partial<{
    shippingAddress: AddressModel;
    billingAddress: AddressModel;
    shippingSameAsBilling?: boolean;
  }>;
}>;

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
export class SimpleComponent implements AfterViewInit {
  @ViewChild('form') protected ngForm!: NgForm;
  private readonly productService = inject(ProductService);
  public readonly products = toSignal(this.productService.getAll());

  protected readonly formValue = signal<FormModel>({});

  public ngAfterViewInit() {
    // When the form is ready
    this.ngForm!.form.valueChanges.subscribe(value => {
      // Set our partial form value
      this.formValue.set(value);
    });
  }

  logForm() {
    console.log(this.ngForm);
  }
}
