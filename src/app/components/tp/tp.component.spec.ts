import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpComponent } from './tp.component';

describe('TpComponent', () => {
  let component: TpComponent;
  let fixture: ComponentFixture<TpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TpComponent]
    });
    fixture = TestBed.createComponent(TpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
