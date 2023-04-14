import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent, genMonth, genBackfillMonth, genWeek, genDay, validateRecurringInterval } from './home.component';
import {DateTime} from "luxon";

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ HomeComponent ]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// ng test --include='src/app/home/**/*.spec.ts'

// Sprint 2 Tests

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
  it('should give the interval (29, 11) and months 1 and 3', () => {
    const month = genBackfillMonth(DateTime.fromObject({year: 2023, month: 2, day: 6}));
    expect(month.start.day).toBe(29);
    expect(month.end.day).toBe(11);
    expect(month.start.month).toBe(1);
    expect(month.end.month).toBe(3);
  });
});

describe('genDay()', () => {
  it('should give the interval (31, 31)', () => {
    const day = genDay(DateTime.fromObject({year: 2023, month: 1, day: 31}));
    expect(day.start.day).toBe(31);
    expect(day.end.day).toBe(31);
  })
});


// Sprint 3
describe('validateRecurringInterval()', () => {
  it('should say that the dates are invalid', () => {
    const startDate = DateTime.fromObject({year:2023, month: 1, day: 31});
    const endDate = DateTime.fromObject({year:2022, month: 3, day: 28});
    expect(validateRecurringInterval(startDate, endDate)).toBe(false);
  })
})

describe('validateRecurringInterval()', () => {
  it('should say that the dates are valid', () => {
    const startDate = DateTime.fromObject({year:2021, month: 3, day: 30});
    const endDate = DateTime.fromObject({year:2026, month: 1, day: 28});
    expect(validateRecurringInterval(startDate, endDate)).toBe(true);
  })
})
