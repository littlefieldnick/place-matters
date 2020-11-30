import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewComponent } from './main-view.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainViewComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
