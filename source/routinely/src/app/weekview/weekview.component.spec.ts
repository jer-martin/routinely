import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekviewComponent } from './weekview.component';

describe('WeekviewComponent', () => {
  let component: WeekviewComponent;
  let fixture: ComponentFixture<WeekviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
