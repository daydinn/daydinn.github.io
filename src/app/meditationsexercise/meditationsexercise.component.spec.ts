import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationsexerciseComponent } from './meditationsexercise.component';

describe('MeditationsexerciseComponent', () => {
  let component: MeditationsexerciseComponent;
  let fixture: ComponentFixture<MeditationsexerciseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeditationsexerciseComponent],
    });
    fixture = TestBed.createComponent(MeditationsexerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
