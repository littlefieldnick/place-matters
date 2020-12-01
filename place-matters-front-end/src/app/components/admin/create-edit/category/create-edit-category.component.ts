import { Component, OnInit } from '@angular/core';
import {CategoryForm} from "../../../../forms/category.form";
import {ResourceCategory} from "../../../../models/resource_category";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../../services/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {DefaultErrorMatcher} from "../../../../error-matchers/default.error-matcher";

@Component({
  selector: 'create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss']
})
export class CreateEditCategoryComponent implements OnInit {
  editing: boolean
  formSubmitted: boolean
  categoryForm: CategoryForm;
  category: ResourceCategory;
  matcher = new DefaultErrorMatcher()

  constructor(activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private router: Router,
              private categoryService: CategoryService) {

    this.formSubmitted = false;
    this.categoryForm = new CategoryForm();
    this.category = new ResourceCategory();
    this.editing = activatedRoute.snapshot.params["mode"] == 'edit';

    if(this.editing){
      this.categoryService.getCategories(activatedRoute.snapshot.params["id"]).subscribe((categoryInfo: ResourceCategory) => {
        Object.assign(this.category, categoryInfo);
        Object.keys(this.category).forEach((p => {
          if (this.categoryForm.contains(p)) {
            this.categoryForm.controls[p].setValue(this.category[p]);
          }
        }));
      });
    }

  }

  ngOnInit(): void {
  }

  submitForm(){
    this.formSubmitted = true;

    Object.keys(this.categoryForm.controls).forEach((c) => {
      this.category[c] = this.categoryForm.controls[c].value
    });

    if(this.categoryForm.valid){
      console.log(this.category);

      this.categoryService.saveCategory(this.category)
          .pipe(catchError(err => {
        this.displayServerError(err);
        return of([])
      })).subscribe((data) => {
        if (data["success"]) {
          this.router.navigate(["admin/view/categories"]);
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
