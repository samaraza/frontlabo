import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvDComponent } from './inv-d.component';

describe('InvDComponent', () => {
  let component: InvDComponent;
  let fixture: ComponentFixture<InvDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvDComponent]
    });
    fixture = TestBed.createComponent(InvDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
