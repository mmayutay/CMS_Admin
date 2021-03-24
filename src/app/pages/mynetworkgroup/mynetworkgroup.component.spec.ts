import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MynetworkgroupComponent } from './mynetworkgroup.component';

describe('MynetworkgroupComponent', () => {
  let component: MynetworkgroupComponent;
  let fixture: ComponentFixture<MynetworkgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MynetworkgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MynetworkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
