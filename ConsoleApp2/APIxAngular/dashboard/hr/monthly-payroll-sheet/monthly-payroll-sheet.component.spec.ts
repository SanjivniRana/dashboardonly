import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPayrollSheetComponent } from './monthly-payroll-sheet.component';

describe('MonthlyPayrollSheetComponent', () => {
  let component: MonthlyPayrollSheetComponent;
  let fixture: ComponentFixture<MonthlyPayrollSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyPayrollSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyPayrollSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
