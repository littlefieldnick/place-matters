import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { DashComponent } from './dash.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppConfigService} from "../../../services/app-config.service";

export class MockAppConfigService extends AppConfigService{

}

describe('DashComponent', () => {
  let component: DashComponent;
  let fixture: ComponentFixture<DashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule,
        HttpClientTestingModule

    ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashComponent);
    component = fixture.componentInstance;
    component.loggedInUser = {firstName: "John", lastName: "Smith"};
    fixture.detectChanges();
  });

  it('should compile', () => {

    expect(component).toBeTruthy();
  });
});
