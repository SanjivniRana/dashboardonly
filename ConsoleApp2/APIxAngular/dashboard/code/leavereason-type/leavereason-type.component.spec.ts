import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavereasonTypeComponent } from './leavereason-type.component';

describe('LeavereasonTypeComponent', () => {
  let component: LeavereasonTypeComponent;
  let fixture: ComponentFixture<LeavereasonTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavereasonTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavereasonTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
