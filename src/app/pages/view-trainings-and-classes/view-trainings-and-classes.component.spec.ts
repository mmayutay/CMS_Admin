import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainingsAndClassesComponent } from './view-trainings-and-classes.component';

describe('ViewTrainingsAndClassesComponent', () => {
  let component: ViewTrainingsAndClassesComponent;
  let fixture: ComponentFixture<ViewTrainingsAndClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrainingsAndClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrainingsAndClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
