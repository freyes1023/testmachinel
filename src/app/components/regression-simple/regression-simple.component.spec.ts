import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionSimpleComponent } from './regression-simple.component';

describe('RegressionSimpleComponent', () => {
  let component: RegressionSimpleComponent;
  let fixture: ComponentFixture<RegressionSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegressionSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegressionSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
