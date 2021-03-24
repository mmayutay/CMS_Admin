import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsandannouncementsComponent } from './eventsandannouncements.component';

describe('EventsandannouncementsComponent', () => {
  let component: EventsandannouncementsComponent;
  let fixture: ComponentFixture<EventsandannouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsandannouncementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsandannouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
