import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionStrengthComponent } from './emotion-strength.component';

describe('EmotionStrengthComponent', () => {
  let component: EmotionStrengthComponent;
  let fixture: ComponentFixture<EmotionStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionStrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
