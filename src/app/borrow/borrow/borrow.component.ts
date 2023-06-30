import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BorrowService } from '../borrow.service';
import { UserService } from '../../user/user.service';
import { BookService } from '../../book/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Book } from 'projects/shared/src/public-api';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {
  borrowForm: FormGroup;
  userId: number;
  books: any[][] = [];

  constructor(
    private fb: FormBuilder,
    private borrowService: BorrowService,
    private userService: UserService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.borrowForm = this.fb.group({
      books: this.fb.array([])
    });

    this.userId = this.route.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.addBookField();
  }

  createBookFormGroup(): FormGroup {
    const group = this.fb.group({
      bookId: [''],
      title: ['', Validators.required]
    });
  
    const bookIndex = this.booksFormArray.length;
    this.books[bookIndex] = [];
  
    group.get('title')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(title => this.bookService.search(title!))
    ).subscribe(books => {
      this.books[bookIndex] = books;
    });
  
    return group;
  }  

  get booksFormArray(): FormArray {
    return this.borrowForm.get('books') as FormArray;
  }

  addBookField() {
    if (this.booksFormArray.length < 5) {
      this.booksFormArray.push(this.createBookFormGroup());
    }
  }

  displayBook(book: any): string {
    return book && book.title ? book.title : '';
  }  

  removeBookField(index: number) {
    this.booksFormArray.removeAt(index);
  }

  onBookSelected(event: MatAutocompleteSelectedEvent, index: number): void {
    const selectedBook = this.books[index].find((book: Book) => book.title === event.option.value);
    if (selectedBook) {
      this.booksFormArray.at(index).patchValue({
        bookId: selectedBook.bookId
      });
    }
  }  

  onSubmit() {
    if (this.borrowForm.valid) {
      const bookIds = this.borrowForm.value.books.map((book: { bookId: number }) => book.bookId);
      this.borrowService.borrowBooks(this.userId, bookIds).subscribe({
        next: () => {
          
          this.snackBar.open('Borrow created successfully!', '', {
            duration: 4000, 
          });
          this.router.navigate(['/user/list']);
        },
        error: (error) => {
          
          console.error('An error occurred while borrowing books:', error);
        }
      });
    }
  }
  
  
}
