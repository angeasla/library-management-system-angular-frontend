import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent {
  @Input() bookId!: number;
  @Output() onDeleted = new EventEmitter<void>();

  constructor(private bookService: BookService, private snackBar: MatSnackBar) { }

  deleteBook() {
    this.bookService.deleteBook(this.bookId).subscribe(() => {
      console.log("Delete button clicked");
      this.snackBar.open('Book deleted successfully!', '', {
        duration: 4000,
      });
      this.onDeleted.emit();
    });
  }
}
