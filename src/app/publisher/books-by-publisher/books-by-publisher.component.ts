import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'projects/shared/src/public-api';
import { Publisher } from 'projects/shared/src/public-api';
import { PublisherService } from '../publisher.service';
import { MatDialog } from '@angular/material/dialog';
import { BookUpdateComponent } from 'src/app/book/book-update/book-update.component';
import { BookService } from 'src/app/book/book.service';
import { BookInsertComponent } from 'src/app/book/book-insert/book-insert.component';

@Component({
  selector: 'app-books-by-publisher',
  templateUrl: './books-by-publisher.component.html',
  styleUrls: ['./books-by-publisher.component.css']
})
export class BooksByPublisherComponent implements OnInit {
  books: Book[] = [];
  publisherId: any;
  publisher?: Publisher;

  constructor(
    private publisherService: PublisherService,
    private bookService: BookService,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }


    ngOnInit(): void {
      this.publisherId = +this.route.snapshot.params['publisherId'];
      this.getBooksByPublisher(this.publisherId);

      this.publisherService.getPublisherById(this.publisherId).subscribe(
        (data: Publisher) => {
          console.log("Publisher Data:", data);
          this.publisher = data;
        },
        error => {
          console.error('Error fetching publisher data!', error);
        }
      );
    }

    getBooksByPublisher(publisherId: number): void {
      this.publisherService.findBooksByPublisherId(publisherId).subscribe(books => {
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
        this.getBooksByPublisher(this.publisherId);
      });
    }

    openCreateDialog(): void {
      const dialogRef = this.dialog.open(BookInsertComponent, {
        minWidth: '50%',
        data: { bookId: null }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getBooksByPublisher(this.publisherId);
      });
    }
}
