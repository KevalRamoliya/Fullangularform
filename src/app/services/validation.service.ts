import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  emailValidator(control: FormControl): { [key: string]: boolean } | null {
    const email = control.value;
    if (email && !email.endsWith('.com')) {
      return { invalidDomain: true };
    }
    return null;
  }

}
