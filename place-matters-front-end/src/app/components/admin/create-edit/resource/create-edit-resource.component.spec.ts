import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditResourceComponent } from './create-edit-resource.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('CreateEditResourceComponent', () => {
  let component: CreateEditResourceComponent;
  let fixture: ComponentFixture<CreateEditResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditResourceComponent ],
      imports: [NoopAnimationsModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, MatFormFieldModule, MatInputModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
