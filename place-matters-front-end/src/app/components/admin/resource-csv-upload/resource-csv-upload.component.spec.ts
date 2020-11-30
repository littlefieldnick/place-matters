import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCsvUploadComponent } from './resource-csv-upload.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

describe('ResourceCsvUploadComponent', () => {
  let component: ResourceCsvUploadComponent;
  let fixture: ComponentFixture<ResourceCsvUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceCsvUploadComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule,
        FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCsvUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
