import {FormGroup, Validators} from "@angular/forms";
import {DefaultFormControl} from "./default.form";

export class CategoryForm extends FormGroup {

    constructor() {
        super({
            name: new DefaultFormControl("Category name", "name", "", Validators.required),
            description: new DefaultFormControl("Category description (optional)", "description", "", [])
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
