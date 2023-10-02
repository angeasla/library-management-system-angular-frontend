import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Author, Book, Publisher } from 'projects/shared/src/public-api';
import { BookService } from '../book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-insert',
  templateUrl: './book-insert.component.html',
  styleUrls: ['./book-insert.component.css']
})
export class BookInsertComponent {
  books: Book[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BookInsertComponent>, 
    private router: Router) { }
  
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    isbn: new FormControl(''),
    publisher: new FormControl('', Validators.required),
    pages: new FormControl(0),
    publicationYear: new FormControl(0),
    quantity: new FormControl(0)
  });

  ngOnInit(): void {
    this.loadAuthors();
    this.loadPublishers();
  }
  
  onSubmit() {
    console.log(FormData)
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;      
      const authorId = formData.author;
      const publisherId = formData.publisher;

      if (typeof authorId !== 'number') {
        console.error('Invalid author ID');
        return;
      }

      if (typeof publisherId !== 'number') {
        console.error('Invalid publisher ID');
        return;
      }

      const bookPayload: Partial<Book> = {
          title: formData.title || '',
          author: { authorId: authorId },
          isbn: formData.isbn || '',
          publisher: { publisherId: publisherId },
          pages: formData.pages || 0,
          publicationYear: formData.publicationYear || 0,
          quantity: formData.quantity || 0
      };
      
      this.bookService.createBook(bookPayload).subscribe(book => {
          this.books.push(book);
          this.snackBar.open('Book created successfully!', '', {
            duration: 4000,
          });
          this.dialogRef.close();
      });      
    }
  }

  loadAuthors() {
    this.bookService.getAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  loadPublishers() {
    this.bookService.getPublishers().subscribe(publishers => {
      this.publishers = publishers;
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}