import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Book } from 'projects/shared/src/public-api';
import { BookService } from '../book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-insert',
  templateUrl: './book-insert.component.html',
  styleUrls: ['./book-insert.component.css']
})
export class BookInsertComponent {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar, 
    private router: Router) { }
  
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    isbn: new FormControl(''),
    publisher: new FormControl('', Validators.required),
    pages: new FormControl(0),
    status: new FormControl(1),
  });
  
  onSubmit() {
    if (this.bookForm.valid) {
      this.bookService.createBook(this.bookForm.value as Partial<Book>).subscribe(book => {
        this.books.push(book); 
        this.snackBar.open('Book created successfully!', '', {
          duration: 4000, 
        });
        this.router.navigate(['/book/list']);
      });
    }
  }
}