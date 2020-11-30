import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUserComponent } from './create-edit-user.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

describe('CreateEditUserComponent', () => {
  let component: CreateEditUserComponent;
  let fixture: ComponentFixture<CreateEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditUserComponent ],
      imports: [NoopAnimationsModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule,
        MatFormFieldModule, MatInputModule
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
