import {FormGroup, Validators} from "@angular/forms";
import {DefaultFormControl} from "./default.form";

export class ResourceForm extends FormGroup {
    constructor() {
        super({
            name: new DefaultFormControl("Name", "name", "", Validators.required),
            street: new DefaultFormControl("Street", "street", "",
                Validators.compose([Validators.required])),
            city: new DefaultFormControl("City", "city", "",
                Validators.compose([Validators.required])),
            zip: new DefaultFormControl("Zipcode", "zipcode", "",
                Validators.compose([Validators.required])),
            state: new DefaultFormControl("State", "state", "ME",
                Validators.compose([]), true),
            category: new DefaultFormControl("Category", "category", "",
                Validators.compose([Validators.required])),
            description: new DefaultFormControl("Description", "description", "",
                Validators.compose([Validators.required])),
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
