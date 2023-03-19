import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthviewComponent } from './monthview.component';

describe('MonthviewComponent', () => {
  let component: MonthviewComponent;
  let fixture: ComponentFixture<MonthviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
