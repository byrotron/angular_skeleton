import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenbarImgComponent } from './menbar-img.component';

describe('MenbarImgComponent', () => {
  let component: MenbarImgComponent;
  let fixture: ComponentFixture<MenbarImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenbarImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenbarImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
