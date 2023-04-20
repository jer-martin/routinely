import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayviewComponent } from './dayview.component';

// ng test --include='src/app/dayview/**/*.spec.ts'

describe('DayviewComponent', () => {
  let component: DayviewComponent;
  let fixture: ComponentFixture<DayviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show correct times', () => {
    component.generateTimes();
    expect(component.times[0]).toBe('00:00');
    expect(component.times[5]).toBe('02:30');
    expect(component.times[10]).toBe('05:00');
    expect(component.times[47]).toBe('23:30');
  })

  it('should have correct day counts', () => {
    expect(component.checkDayCount('January')).toBe(31);
    expect(component.checkDayCount('March')).toBe(31);
    expect(component.checkDayCount('April')).toBe(30);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
