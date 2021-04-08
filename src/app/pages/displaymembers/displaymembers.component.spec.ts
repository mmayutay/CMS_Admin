import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaymembersComponent } from './displaymembers.component';

describe('DisplaymembersComponent', () => {
  let component: DisplaymembersComponent;
  let fixture: ComponentFixture<DisplaymembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaymembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaymembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
