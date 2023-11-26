import { Component } from '@angular/core';
import {Borrow} from "../../../../projects/shared/src/lib/borrow.interfaces";
import {Book} from "../../../../projects/shared/src/lib/book.interfaces";
import {User} from "../../../../projects/shared/src/lib/user.interfaces";
import {forkJoin, Observable, Subscription} from "rxjs";
import {BorrowService} from "../borrow.service";
import {UserService} from "../../user/user.service";
import {BookService} from "../../book/book.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-borrow-history',
  templateUrl: './borrow-history.component.html',
  styleUrls: ['./borrow-history.component.css']
})
export class BorrowHistoryComponent {
  borrows: Borrow[] = [];
  bookDetailsArray: Book[] = [];
  userDetailsArray: User[] = [];
  borrowsHistory: Array<{ borrow: Borrow, bookTitle: string, userName: string }> = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private borrowService: BorrowService,
    private userService: UserService,
    private bookService: BookService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadBorrowsHistory;

    this.subscription.add(
      this.borrowService.bookReturned$.subscribe(() => {
        this.loadBorrowsHistory();
      })
    );
  }

  loadBorrowsHistory(): void {
      this.borrowService.getBorrowsHistory().subscribe(borrows => {
          this.borrows = borrows;

          let bookRequests = borrows.map(borrow => this.bookService.getBookById(borrow.id.bookId));
          let userRequests = borrows.map(borrow => this.userService.getUserById(borrow.id.userId));

          forkJoin([...bookRequests, ...userRequests]).subscribe(responses => {
              let booksLength = bookRequests.length;

              this.bookDetailsArray = <Book[]>responses.slice(0, booksLength);
              this.userDetailsArray = <User[]>responses.slice(booksLength);

              this.borrowsHistory = this.borrows.map((borrow, index) => ({
                  borrow: {
                      ...borrow,
                      borrowDate: this.datePipe.transform(borrow.borrowDate, 'dd/MM/yyyy') || borrow.borrowDate,
                      returnDate: this.datePipe.transform(borrow.returnDate, 'dd/MM/yyyy') || borrow.returnDate
                  },
                  bookTitle: this.bookDetailsArray[index]?.title || "Unknown title",
                  userName: `${this.userDetailsArray[index]?.firstname || ''} ${this.userDetailsArray[index]?.lastname || ''}`.trim() || "Unknown user"
              }));
          });
      });
    }
}
