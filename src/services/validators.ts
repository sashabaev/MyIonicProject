import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';

//export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(24),
];

export class RepeatPasswordEStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('passwordAgain').value && control.dirty)
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.passwordAgain.value;

  var res = password === passwordConfirmation ? null : { passwordsNotEqual: true }  
  return res;
}