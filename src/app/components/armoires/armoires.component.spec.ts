import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmoiresComponent } from './armoires.component';

describe('ArmoiresComponent', () => {
  let component: ArmoiresComponent;
  let fixture: ComponentFixture<ArmoiresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmoiresComponent]
    });
    fixture = TestBed.createComponent(ArmoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
