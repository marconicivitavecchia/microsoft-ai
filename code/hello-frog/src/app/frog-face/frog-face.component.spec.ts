import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrogFaceComponent } from './frog-face.component';

describe('FrogFaceComponent', () => {
  let component: FrogFaceComponent;
  let fixture: ComponentFixture<FrogFaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrogFaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrogFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
