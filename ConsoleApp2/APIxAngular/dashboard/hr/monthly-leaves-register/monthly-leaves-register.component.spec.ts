import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyLeavesRegisterComponent } from './monthly-leaves-register.component';

describe('MonthlyLeavesRegisterComponent', () => {
  let component: MonthlyLeavesRegisterComponent;
  let fixture: ComponentFixture<MonthlyLeavesRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyLeavesRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyLeavesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
