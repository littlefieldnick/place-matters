import {FormGroup} from '@angular/forms'
import {DefaultFormControl} from "./default.form";

export class SearchForm extends FormGroup{
  constructor() {
    super({
      name: new DefaultFormControl('Organization Name', 'name', '', [], false),
      category: new DefaultFormControl('Category', 'category', '', [], false ),
      county: new DefaultFormControl('County', 'county', '', [], false)
    });
  }

  get formControls(): DefaultFormControl[] {
    return Object.keys(this.controls)
      .map(k => this.controls[k] as DefaultFormControl);
  }
}
