import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionMultipleComponent } from './regression-multiple.component';

describe('RegressionMultipleComponent', () => {
  let component: RegressionMultipleComponent;
  let fixture: ComponentFixture<RegressionMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegressionMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegressionMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
