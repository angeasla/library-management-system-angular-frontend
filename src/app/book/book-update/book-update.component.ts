import { Component, OnInit } from '@angular/core';
import { Book } from 'projects/shared/src/public-api';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number | null = null;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.fb.group({
      'title': ['', Validators.required],
      'author': ['', Validators.required],
      'isbn': ['', Validators.required],
      'publisher': ['', Validators.required],
      'pages': ['', Validators.required],
      'status': ['', Validators.required]
    });
   }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('bookId');
    if (bookId) {
      this.bookId = Number(bookId); // Assign bookId to this.bookId
      this.bookService.getBookById(this.bookId).subscribe(book => {
        this.bookForm.setValue({
          'title': book.title,
          'author': book.author,
          'isbn': book.isbn,
          'publisher': book.publisher,
          'pages': book.pages,
          'status': book.status
        });
      });
    }
  }
  

  updateBook(): void {
    if (this.bookForm.valid && this.bookId) {
      this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe(() => {
        this.snackBar.open('Book updated successfully!', '', {
          duration: 2000
        });
        this.router.navigate(['/book/list']);
      });
    }
  }  
}


