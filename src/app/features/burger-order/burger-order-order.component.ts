import {ChangeDetectorRef, Component} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BurgerApiService} from "../service/burger-api/burger-api.service";
import {first} from "rxjs";
import {SelectOptions} from "../interface/select-options";
import {BurgerService} from "../service/burger/burger.service";
import {FormService} from "../service/form/form.service";
import {DropdownModule} from "primeng/dropdown";
import {InputSwitchModule} from "primeng/inputswitch";
import {MultiSelectModule} from "primeng/multiselect";
import {ButtonModule} from "primeng/button";

@Component({
  standalone: true,
  selector: 'app-burger-order',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DropdownModule, InputSwitchModule, MultiSelectModule, ButtonModule],
  templateUrl: './burger-order-order.component.html',
  styleUrls: ['./burger-order-order.component.scss']
})
export class BurgerOrderOrderComponent {
  burgerForm!: FormGroup;
  selectOptions: SelectOptions = {
    breadTypes: [],
    hamburgerTypes: [],
    ingredients: []
  };

  constructor(
    private burgerApiService: BurgerApiService,
    private burgerService: BurgerService,
    private formService: FormService,
    private cdr: ChangeDetectorRef
  ) {
    this.fetchSelectOptionsData();
  }
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.burgerForm = this.formService.orderBurgerFormGroup();
    this.addBurger();
  }
  fetchSelectOptionsData(): void {
    this.burgerApiService.getSelectOptions().subscribe({
      next: (options: SelectOptions) => {
        this.selectOptions = options;
      },
      error: (err) => {
        console.error('Error fetching select options:', err);
      }
    });
  }
  updateBurgers(): void {
    const numBurgers = this.burgerForm.get('numberOfBurgers')?.value;
    const currentBurgersCount = this.burgers.length;

    for (let i = currentBurgersCount; i < numBurgers; i++) {
      this.addBurger();
    }

    for (let i = currentBurgersCount - 1; i >= numBurgers; i--) {
      this.removeBurger(i);
    }
  }
  getControl(controlName: string, index: number): AbstractControl | null {
    return this.burgers.at(index).get(controlName);
  }
  removeBurger(index: number): void {
    this.burgers.removeAt(index);
    if (this.burgerForm.get('numberOfBurgers')?.value >= 1) {
      this.burgerForm.get('numberOfBurgers')?.setValue(this.burgerForm.get('numberOfBurgers')?.value - 1);
    }
  }
  addBurger(): void {
    const newBurgerForm = this.formService.createBurgerFormGroup();

    newBurgerForm.get('hamburger')?.valueChanges.subscribe((value: string) => {
      const rareCookingControl = newBurgerForm.get('rareCooking');
      if (value === 'Beef' || value === 'Gluten-free') {
        rareCookingControl?.setValidators(Validators.required);
      } else {
        rareCookingControl?.clearValidators();
      }
      rareCookingControl?.updateValueAndValidity();
    });

    this.burgers.push(newBurgerForm);
  }
  submitForm(): void {
    if (this.burgerForm.valid) {
      console.log('Form submitted successfully!');
      localStorage.setItem('burgerOrder', JSON.stringify(this.burgerForm.value));
    } else {
      console.error('Form is invalid!');
      this.burgerService.markFormGroupTouched(this.burgerForm);
    }
  }
  get burgers(): FormArray {
    return this.burgerForm.get('burgers') as FormArray;
  }
}
