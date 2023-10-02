import { Component, Inject, OnInit } from '@angular/core';
import { Borrow } from 'projects/shared/src/public-api';
import { BorrowService } from 'src/app/borrow/borrow.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { User } from 'projects/shared/src/public-api';
import { Book } from 'projects/shared/src/public-api';
import { BookService } from 'src/app/book/book.service';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-active-borrows',
  templateUrl: './user-active-borrows.component.html',
  styleUrls: ['./user-active-borrows.component.css'],
  providers: [DatePipe]
})
export class UserActiveBorrowsComponent implements OnInit {
  userId?: number;
  borrows: Borrow[] = [];
  bookDetailsArray: Book[] = [];
  activeBorrows: any[] = [];

  constructor(
    private borrowService: BorrowService,
    private userService: UserService,
    private bookService: BookService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<UserActiveBorrowsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
    ) { }

  ngOnInit(): void {
    this.userId = this.data.userId;
    this.loadActiveBorrows();
  }

  loadActiveBorrows(): void {
    console.log('UserId:', this.userId);
  
    if (this.userId !== undefined) {
      this.borrowService.getActiveBorrowsByUserId(this.userId).subscribe(borrows => {
        console.log('Borrows:', borrows);
        
        this.borrows = [];
        this.activeBorrows = [];
        this.cdr.detectChanges();
  
        this.borrows = borrows;
  
        let bookRequests = borrows.map((borrow: Borrow) => this.bookService.getBookById(borrow.id.bookId));
  
        forkJoin(bookRequests).subscribe(responses => {
          this.bookDetailsArray = <Book[]>responses;
  
          this.activeBorrows = [...this.borrows.map((borrow, index) => ({
            borrow: {
              ...borrow,
              borrowDate: this.datePipe.transform(borrow.borrowDate, 'dd/MM/yyyy') || borrow.borrowDate,
              returnDate: borrow.returnDate ? this.datePipe.transform(borrow.returnDate, 'dd/MM/yyyy') : null
            },
            bookTitle: this.bookDetailsArray[index]?.title || "Unknown title"
          }))];
  
          if (this.activeBorrows.length === 0) {
            console.log('Redirecting because active borrows is empty');
            this.dialogRef.close();
          }
        });
      });
    }    
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
