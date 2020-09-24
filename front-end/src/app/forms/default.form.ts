import {FormControl} from '@angular/forms'

export class DefaultFormControl extends FormControl{
  label: string
  modelProperty: string
  constructor(label: string, property: string, value:any, validator:any, disabled?: boolean) {
    super({value: value, disabled: disabled}, validator);
    this.label = label
    this.modelProperty = property
  }
}
