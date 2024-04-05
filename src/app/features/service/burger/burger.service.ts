import { Injectable } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class BurgerService {

  constructor() { }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
