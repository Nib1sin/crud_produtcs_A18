import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nonNegativePriceValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value !== null && value < 0) {
    return { nonNegativePrice: true };
  }
  return null;
}