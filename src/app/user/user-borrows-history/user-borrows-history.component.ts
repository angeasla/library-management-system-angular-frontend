import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Borrow} from "../../../../projects/shared/src/lib/borrow.interfaces";
import {Book} from "../../../../projects/shared/src/lib/book.interfaces";
import {BorrowService} from "../../borrow/borrow.service";
import {UserService} from "../user.service";
import {BookService} from "../../book/book.service";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-user-borrows-history',
  templateUrl: './user-borrows-history.component.html',
  styleUrls: ['./user-borrows-history.component.css']
})
export class UserBorrowsHistoryComponent implements OnInit{
  userId?: number;
  borrows: Borrow[] = [];
  bookDetailsArray: Book[] = [];
  borrowsHistory: any[] = [];
  userFirstName?: string;
  userLastName?: string;

  constructor(
    private borrowService: BorrowService,
    private userService: UserService,
    private bookService: BookService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<UserBorrowsHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {}

  ngOnInit(): void {
    this.userId = this.data.userId;
    this.loadUserDetails();
    this.loadBorrowsHistoryByUser();
  }

  loadUserDetails(): void {
    if (this.userId !== undefined) {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userFirstName = user.firstname;
        this.userLastName = user.lastname;
      });
    }
  }

  loadBorrowsHistoryByUser(): void {
      if (this.userId !== undefined) {
          this.borrowService.getBorrowsHistoryByUserId(this.userId).subscribe(borrows => {
              console.log('Borrows:', borrows);

              this.borrows = [];
              this.borrowsHistory = [];
              this.cdr.detectChanges();

              this.borrows = borrows;

              let bookRequests = borrows.map((borrow: Borrow) => this.bookService.getBookById(borrow.id.bookId));

              forkJoin(bookRequests).subscribe(responses => {
                  this.bookDetailsArray = <Book[]>responses;

                  this.borrowsHistory = [...this.borrows.map((borrow, index) => ({
                      borrow: {
                          ...borrow,
                          borrowDate: this.datePipe.transform(borrow.borrowDate, 'dd/MM/yyyy') || borrow.borrowDate,
                          returnDate: this.datePipe.transform(borrow.returnDate, 'dd/MM/yyyy') || borrow.returnDate
                      },
                      bookTitle: this.bookDetailsArray[index]?.title || "Unknown title"
                  }))];

                  if (this.borrowsHistory.length === 0) {
                      console.log('Redirecting because borrows history is empty');
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
