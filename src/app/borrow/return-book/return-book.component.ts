import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BorrowService } from '../borrow.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent {
  @Input() userId?: number;
  @Input() bookId?: number;
  @Output() bookReturned = new EventEmitter<void>();

  constructor(
    private borrowService: BorrowService,
    private snackBar: MatSnackBar
    ) { }

  returnBorrowedBook(): void {
    if (this.userId === undefined || this.bookId === undefined) {
      console.error("UserId or BookId is not provided!");
      return;
    }

    this.borrowService.returnBook(this.userId, this.bookId).subscribe(
      response => {
        this.bookReturned.emit();
        this.snackBar.open('Book returned successfully!', '', {
          duration: 2000
      });
      },
      error => {
        this.snackBar.open('Error in returning book!', '', {
          duration: 2000
      });
      }
    );
  }
}
