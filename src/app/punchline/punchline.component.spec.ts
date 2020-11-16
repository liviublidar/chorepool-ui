import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchlineComponent } from './punchline.component';

describe('PunchlineComponent', () => {
  let component: PunchlineComponent;
  let fixture: ComponentFixture<PunchlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
