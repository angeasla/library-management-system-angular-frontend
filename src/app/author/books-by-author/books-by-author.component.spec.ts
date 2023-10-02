import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksByAuthorComponent } from './books-by-author.component';

describe('BooksByAuthorComponent', () => {
  let component: BooksByAuthorComponent;
  let fixture: ComponentFixture<BooksByAuthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksByAuthorComponent]
    });
    fixture = TestBed.createComponent(BooksByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
