import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksByPublisherComponent } from './books-by-publisher.component';

describe('BooksByPublisherComponent', () => {
  let component: BooksByPublisherComponent;
  let fixture: ComponentFixture<BooksByPublisherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksByPublisherComponent]
    });
    fixture = TestBed.createComponent(BooksByPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
