import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from 'projects/shared/src/public-api';

@Component({
  selector: 'app-book-search-by-title',
  templateUrl: './book-search-by-title.component.html',
  styleUrls: ['./book-search-by-title.component.css']
})
export class BookSearchByTitleComponent implements OnInit {
  @Output() bookFound = new EventEmitter();
  title: string = '';
  book: Book | null = null;

  constructor(
    private bookService: BookService
  ) {}

  ngOnInit(): void {}

  search(): void {
    this.bookService.getBookByTitle(this.title).subscribe(
      book => this.bookFound.emit(book),
      error => console.error('Error fetching book by title', error)
    );
  }
}
