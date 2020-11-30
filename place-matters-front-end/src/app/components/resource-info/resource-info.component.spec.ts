import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceInfoComponent } from './resource-info.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ResourceInfoComponent', () => {
  let component: ResourceInfoComponent;
  let fixture: ComponentFixture<ResourceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceInfoComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceInfoComponent);
    component = fixture.componentInstance;
    component.resource = {
      id: 3,
      name: "University of Southern Maine",
      street: "96 Falmouth Street",
      city: "Portland,",
      state: "ME",
      zip: "04104",
      description: "USM Science Building",
      website: "usm.maine.edu",
      latitude: undefined,
      longitude: undefined,
      category: {
        id: 1,
        categoryName: "Education"
      },
      county: {
        id: 3,
        countyName: "Cumberland"
      }

    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
