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
  totalBooks = 0;
  pageSize = 10;
  currentPage = 0;
  pageNumbers: number[] = [];
  @ViewChild(BorrowBookComponent, { static: false }) borrowBookComponent?: BorrowBookComponent;

  constructor(
    private bookService: BookService, 
    private userService: UserService,
    private dialog: MatDialog
    ) { }


  ngOnInit(): void {
    this.getAllBooksWithPagination(this.currentPage);
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

  getAllBooksWithPagination(page: number): void {
    this.bookService.getAllBooksWithPagination(page, 10).subscribe({
        next: response => {
            this.books = response.content;
            this.totalBooks = response.totalElements; 
            this.pageNumbers = Array.from({length: response.totalPages}, (_, i) => i);
        },
        error: error => {
            console.error("Error fetching books:", error);
        }
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
      this.getAllBooksWithPagination(0);
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(BookInsertComponent, {
      minWidth: '50%',
      data: { bookId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllBooksWithPagination(0);
    });
  }

  onPageChange(newPage: number): void {
    if(newPage >= 0 && newPage < this.pageNumbers.length) {
      this.currentPage = newPage;
      // Fetch the books for the new page by calling an API with pagination.
      this.getAllBooksWithPagination(newPage);
    }
  }
}
