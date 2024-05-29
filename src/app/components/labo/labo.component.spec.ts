import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboComponent } from './labo.component';

describe('LaboComponent', () => {
  let component: LaboComponent;
  let fixture: ComponentFixture<LaboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaboComponent]
    });
    fixture = TestBed.createComponent(LaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
