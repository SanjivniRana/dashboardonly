import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeCodeComponent } from './office-code.component';

describe('OfficeCodeComponent', () => {
  let component: OfficeCodeComponent;
  let fixture: ComponentFixture<OfficeCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
