import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceViewComponent } from './resource-view.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ResourceViewComponent', () => {
  let component: ResourceViewComponent;
  let fixture: ComponentFixture<ResourceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceViewComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
