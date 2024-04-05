import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) { }

  orderBurgerFormGroup(): FormGroup {
    return this.formBuilder.group({
      numberOfBurgers: [1, [Validators.required, Validators.min(1)]],
      tableNumber: ['', Validators.required],
      burgers: this.formBuilder.array([])
    });
  }

  createBurgerFormGroup(): FormGroup {
    return this.formBuilder.group({
      breadType: ['', Validators.required],
      hamburger: ['', Validators.required],
      ingredients: [''],
      rareCooking: [false, Validators.required],
      notes: ['']
    });
  }
}
