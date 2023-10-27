import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchByTitleComponent } from './book-search-by-title.component';

describe('BookSearchByTitleComponent', () => {
  let component: BookSearchByTitleComponent;
  let fixture: ComponentFixture<BookSearchByTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookSearchByTitleComponent]
    });
    fixture = TestBed.createComponent(BookSearchByTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
