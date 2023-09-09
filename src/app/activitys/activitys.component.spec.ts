import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitysComponent } from './activitys.component';

describe('ActivitysComponent', () => {
  let component: ActivitysComponent;
  let fixture: ComponentFixture<ActivitysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitysComponent]
    });
    fixture = TestBed.createComponent(ActivitysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
