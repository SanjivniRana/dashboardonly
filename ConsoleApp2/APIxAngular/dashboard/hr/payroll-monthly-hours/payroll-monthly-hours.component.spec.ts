import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollMonthlyHoursComponent } from './payroll-monthly-hours.component';

describe('PayrollMonthlyHoursComponent', () => {
  let component: PayrollMonthlyHoursComponent;
  let fixture: ComponentFixture<PayrollMonthlyHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollMonthlyHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollMonthlyHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
