import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerWrapperComponent } from './pager-wrapper.component';

describe('PagerWrapperComponent', () => {
  let component: PagerWrapperComponent;
  let fixture: ComponentFixture<PagerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagerWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
