import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClassesComponent } from './add-new-classes.component';

describe('AddNewClassesComponent', () => {
  let component: AddNewClassesComponent;
  let fixture: ComponentFixture<AddNewClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
