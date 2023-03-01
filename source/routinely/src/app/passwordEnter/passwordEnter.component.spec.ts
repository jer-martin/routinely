import { ComponentFixture, TestBed } from '@angular/core/testing';

import { passwordEnterComponent } from './passwordEnter.component';

describe('LoginComponent', () => {
  let component: passwordEnterComponent;
  let fixture: ComponentFixture<passwordEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ passwordEnterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(passwordEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
