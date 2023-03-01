import { ComponentFixture, TestBed } from '@angular/core/testing';

import { apiComponent } from './api.component';

describe('apiComponent', () => {
  let component: apiComponent;
  let fixture: ComponentFixture<apiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ apiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(apiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
