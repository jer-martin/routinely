import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent, genMonth, genBackfillMonth, genWeek, genDay } from './home.component';
import {DateTime} from "luxon";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('genMonth()', () => {

  it('should give the interval (1, 28)', () => {
    const month = genMonth(DateTime.fromObject({year: 2023, month: 2, day: 6}));
    expect(month.start.day).toBe(1);
    expect(month.end.day).toBe(28);
  });
  it('should give the interval (1, 29)', () => {
    const month = genMonth(DateTime.fromObject({year: 2024, month: 2, day: 1}));
    expect(month.start.day).toBe(1);
    expect(month.end.day).toBe(29);
  });
  it('should give the interval (1, 31)', () => {
    const month = genMonth(DateTime.fromObject({year: 2023, month: 1, day: 31}));
    expect(month.start.day).toBe(1);
    expect(month.end.day).toBe(31);
  })
});

describe('genBackfillMonth()', () => {
  it('should give the interval (29, 11) and months january and march', () => {
    const month = genBackfillMonth(DateTime.fromObject({year: 2023, month: 2, day: 6}));
    expect(month.start.day).toBe(29);
    expect(month.end.day).toBe(11);
    expect(month.start.month).toBe(1);
    expect(month.end.month).toBe(3);
  });
});

describe('genDay()', () => {
  it('should give the interval (1, 31)', () => {
    const day = genMonth(DateTime.fromObject({year: 2023, month: 1, day: 31}));
    expect(day.start.day).toBe(31);
    expect(day.end.day).toBe(31);
  })
});

describe('iterateMonthDown()', () => {

})

describe('iterateMonthUp()', () => {

})
