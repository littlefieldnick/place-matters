import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryViewComponent } from './category-view.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CategoryViewComponent', () => {
  let component: CategoryViewComponent;
  let fixture: ComponentFixture<CategoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryViewComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
