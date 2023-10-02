import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'projects/shared/src/public-api';
import { Author } from 'projects/shared/src/public-api';
import { AuthorService } from '../author.service';
import { MatDialog } from '@angular/material/dialog';
import { BookUpdateComponent } from 'src/app/book/book-update/book-update.component';
import { BookInsertComponent } from 'src/app/book/book-insert/book-insert.component';
import { BookService } from 'src/app/book/book.service';

@Component({
  selector: 'app-books-by-author',
  templateUrl: './books-by-author.component.html',
  styleUrls: ['./books-by-author.component.css']
})
export class BooksByAuthorComponent implements OnInit {
  books: Book[] = [];
  authorId: any;
  author?: Author;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.authorId = +this.route.snapshot.params['authorId'];
      this.getBooksByAuthor(this.authorId);

      this.authorService.getAuthorById(this.authorId).subscribe(
        (data: Author) => {
          console.log("Author Data:", data);
          this.author = data;
        },
        error => {
          console.error('Error fetching author data!', error);
        }
      );
   }

   getBooksByAuthor(authorId: number): void {
     this.authorService.findBooksByAuthorId(authorId).subscribe(books => {
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
      this.getBooksByAuthor(this.authorId);
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(BookInsertComponent, {
      minWidth: '50%',
      data: { bookId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBooksByAuthor(this.authorId);
    });
  }
}
