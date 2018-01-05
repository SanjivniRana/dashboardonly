import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectActivitiesImplementationComponent } from './project-activities-implementation.component';

describe('ProjectActivitiesComponent', () => {
  let component:  ProjectActivitiesImplementationComponent;
  let fixture: ComponentFixture< ProjectActivitiesImplementationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ProjectActivitiesImplementationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( ProjectActivitiesImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
