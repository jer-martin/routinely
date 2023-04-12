import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatModalComponent } from './cat-modal.component';

describe('EventModalComponent', () => {
  let component: CatModalComponent;
  let fixture: ComponentFixture<CatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
