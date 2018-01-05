import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesImplementationComponent } from './beneficiaries-implementation.component';

describe('BeneficiariesComponent', () => {
  let component: BeneficiariesImplementationComponent;
  let fixture: ComponentFixture<BeneficiariesImplementationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiariesImplementationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
