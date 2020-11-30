import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewComponent } from './admin-view.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AdminViewComponent', () => {
  let component: AdminViewComponent;
  let fixture: ComponentFixture<AdminViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
