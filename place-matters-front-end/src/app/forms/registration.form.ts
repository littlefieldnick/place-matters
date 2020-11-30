import {FormGroup, Validators} from '@angular/forms'
import {DefaultFormControl} from "./default.form";

export class RegistrationForm extends FormGroup{
  constructor() {
    super({
      firstName: new DefaultFormControl('First Name', 'firstName', '', [Validators.required], false),
      lastName: new DefaultFormControl('Last Name', 'lastName', '', [Validators.required], false ),
      email: new DefaultFormControl('Email', 'email', '', [Validators.required], false ),
      role: new DefaultFormControl('Role', 'role', '', [Validators.required], false),
      password: new DefaultFormControl('Password', 'password', '', [Validators.required], false ),
      confirmPassword: new DefaultFormControl('Confirm Password', 'confirmPassword', '', [Validators.required], false )
    })
  }

  get formControls(): DefaultFormControl[] {
    return Object.keys(this.controls)
      .map(k => this.controls[k] as DefaultFormControl);
  }

  getValidationMessages(name: string): string[] {
    return (this.controls[name] as DefaultFormControl).getValidationMessages();
  }

  getFormValidationMessages() : string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach(c =>
      messages.push(...(c as DefaultFormControl).getValidationMessages()));
    return messages;
  }
}
