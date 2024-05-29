import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleTpComponent } from './salle-tp.component';

describe('SalleTpComponent', () => {
  let component: SalleTpComponent;
  let fixture: ComponentFixture<SalleTpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalleTpComponent]
    });
    fixture = TestBed.createComponent(SalleTpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
