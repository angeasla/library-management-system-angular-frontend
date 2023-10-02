import { Component, Inject, OnInit } from '@angular/core';
import { Book, Publisher, Author } from 'projects/shared/src/public-api';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number | null = null;
  publishers: Publisher[] = [];
  authors: Author[] = [];
  book: Book | null = null;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BookUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: number }
  ) {
    this.bookId = data.bookId;
    this.bookForm = this.fb.group({
      'title': ['', Validators.required],
      'author': ['', Validators.required],
      'isbn': ['', Validators.required],
      'publisher': ['', Validators.required],
      'pages': ['', Validators.required],
      'publicationYear': ['', Validators.required],
      'quantity': ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.bookService.getPublishers().subscribe(publishers => {
      this.publishers = publishers;
    });
    this.bookService.getAuthors().subscribe(authors => {
      this.authors = authors;
    });
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe(book => {
          this.book = book;
      });
    }  
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe(book => {
        if (typeof book.publisher === 'object' && typeof book.author === 'object') {
        this.bookForm.patchValue({
          'title': book.title,
          'author': book.author.authorId,
          'isbn': book.isbn,
          'publisher': book.publisher.publisherId,
          'pages': book.pages,
          'publicationYear': book.publicationYear,
          'quantity': book.quantity
        }); }
      });
    }
  }
  

  updateBook(): void {
    if (this.bookForm.valid && this.bookId) {
      const bookData = {...this.bookForm.value};

      const selectedPublisher = this.publishers.find(pub => pub.publisherId === +bookData.publisher);
      if (selectedPublisher) {
          bookData.publisher = selectedPublisher;
      }

      const selectedAuthor = this.authors.find(auth => auth.authorId === +bookData.author);
      if (selectedAuthor) {
          bookData.author = selectedAuthor;
      }

      this.bookService.updateBook(this.bookId, bookData).subscribe(() => {
          this.snackBar.open('Book updated successfully!', '', {
              duration: 2000
          });
          this.dialogRef.close();
      });
   }
  }    

  onCancelClick(): void {
    this.dialogRef.close();
  }
}


