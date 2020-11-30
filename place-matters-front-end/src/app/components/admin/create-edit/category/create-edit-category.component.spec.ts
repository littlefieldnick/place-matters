import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCategoryComponent } from './create-edit-category.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";

describe('CreateEditCategoryComponent', () => {
  let component: CreateEditCategoryComponent;
  let fixture: ComponentFixture<CreateEditCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditCategoryComponent ],
      imports: [NoopAnimationsModule, RouterTestingModule, HttpClientTestingModule,
        MatSnackBarModule, MatFormFieldModule, MatInputModule, MatSelectModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditCategoryComponent);
    component = fixture.componentInstance;
    component.editing = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Edit Category"', () => {

    let h1 = fixture.nativeElement.querySelector("h1");
    console.log(h1);
    expect(h1.textContent).toBe(" Edit Category Information ");
  });
});
