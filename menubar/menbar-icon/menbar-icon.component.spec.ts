import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenbarIconComponent } from './menbar-icon.component';

describe('MenbarIconComponent', () => {
  let component: MenbarIconComponent;
  let fixture: ComponentFixture<MenbarIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenbarIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenbarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
