import { Component, OnInit } from '@angular/core';
import {ResourceForm} from "../../../../forms/resource.form";
import {Resource} from "../../../../models/resource";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {ResourceService} from "../../../../services/resource.service";

@Component({
  selector: 'app-create-edit-resource',
  templateUrl: './create-edit-resource.component.html',
  styleUrls: ['./create-edit-resource.component.scss']
})
export class CreateEditResourceComponent implements OnInit {
  resourceForm: ResourceForm;
  resource: Resource;
  editing: boolean;
  formSubmitted: boolean;

  constructor(activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private router: Router,
              private resourceService: ResourceService) {

    this.formSubmitted = false;
    this.resourceForm = new ResourceForm();
    this.resource = new Resource();
    this.editing = activatedRoute.snapshot.params["mode"] == 'edit';

    if(this.editing){
      this.resourceService.getResources(activatedRoute.snapshot.params["id"]).subscribe((resourceInfo: Resource) => {
        Object.assign(this.resource, resourceInfo);
        Object.keys(this.resource).forEach((p => {
          if (this.resourceForm.contains(p)) {
            this.resourceForm.controls[p].setValue(this.resource[p]);
          }
        }));
      });
    }

  }

  ngOnInit(): void {
  }

  submitForm(){
    this.formSubmitted = true;

    Object.keys(this.resourceForm.controls).forEach((c) => {
      this.resource[c] = this.resourceForm.controls[c].value
    });

    if(this.resourceForm.valid){
      this.resourceService.saveResource(this.resource)
          .pipe(catchError(err => {
            this.displayServerError(err);
            return of([])
          })).subscribe((data) => {
        if (data["success"]) {
          this.router.navigate(["admin/view/resources"]);
        }
      })
    }
  }

  displayServerError(err: string) {
    this.snackBar.open(err, undefined, {
      verticalPosition: "top",
    });
  }

}
