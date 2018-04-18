import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryItemComponent } from './edit-category-item.component';

describe('EditCategoryItemComponent', () => {
  let component: EditCategoryItemComponent;
  let fixture: ComponentFixture<EditCategoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
