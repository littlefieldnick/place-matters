import {FormGroup, Validators} from '@angular/forms'
import {DefaultFormControl} from "./default.form";

export class LoginForm extends FormGroup{
  constructor() {
    super({
      username: new DefaultFormControl('Username', 'username', '', [Validators.required], false),
      password: new DefaultFormControl('Password', 'password', '', [Validators.required], false )
    })
  }

  get formControls(): DefaultFormControl[] {
    return Object.keys(this.controls)
      .map(k => this.controls[k] as DefaultFormControl);
  }
}
