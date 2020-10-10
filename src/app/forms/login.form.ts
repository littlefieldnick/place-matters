import {FormGroup, Validators} from "@angular/forms";
import {DefaultFormControl} from "./default.form";

export class LoginForm extends FormGroup {

  constructor() {
    super({
      email: new DefaultFormControl("Email", "email", "", Validators.required),
      password: new DefaultFormControl("Password", "password", "",
        Validators.compose([Validators.required]))
    });
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
