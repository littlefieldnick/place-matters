import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditResourceComponent } from './create-edit-resource.component';

describe('CreateEditResourceComponent', () => {
  let component: CreateEditResourceComponent;
  let fixture: ComponentFixture<CreateEditResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditResourceComponent ]
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
