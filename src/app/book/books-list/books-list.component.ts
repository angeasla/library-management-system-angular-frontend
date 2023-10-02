import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from 'projects/shared/src/public-api';
import { BookService } from '../book.service';
import { UserService } from 'src/app/user/user.service';
import { BorrowBookComponent } from '../borrow-book/borrow-book.component';
import { MatDialog } from '@angular/material/dialog';
import { BookUpdateComponent } from '../book-update/book-update.component';
import { BookInsertComponent } from '../book-insert/book-insert.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];
  @ViewChild(BorrowBookComponent, { static: false }) borrowBookComponent?: BorrowBookComponent;

  constructor(
    private bookService: BookService, 
    private userService: UserService,
    private dialog: MatDialog
    ) { }


  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

  isPublisherObject(publisher: any): publisher is { publisherId: number; name?: string } {
    return publisher && typeof publisher === 'object' && 'name' in publisher;
  }

  isAuthorObject(author: any): author is { authorId: number; firstname?: string; lastname?: string } {
    return author && typeof author === 'object' && 'firstname' in author && 'lastname' in author;
  }

  openUpdateDialog(bookId: number): void {
    const dialogRef = this.dialog.open(BookUpdateComponent, {
      minWidth: '50%',
      data: { bookId: bookId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllBooks();
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(BookInsertComponent, {
      minWidth: '50%',
      data: { bookId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllBooks();
    });
  }
}
