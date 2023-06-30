import { Component, OnInit } from '@angular/core';
import { Book } from 'projects/shared/src/public-api';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }
}
