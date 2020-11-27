import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCsvUploadComponent } from './resource-csv-upload.component';

describe('ResourceCsvUploadComponent', () => {
  let component: ResourceCsvUploadComponent;
  let fixture: ComponentFixture<ResourceCsvUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceCsvUploadComponent ]
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
