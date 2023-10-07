import { Component, OnInit, OnDestroy } from '@angular/core';
import { Borrow, User, Book } from 'projects/shared/src/public-api';
import { BorrowService } from '../borrow.service';
import { UserService } from 'src/app/user/user.service';
import { BookService } from 'src/app/book/book.service';
import { DatePipe } from '@angular/common';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-active-borrow-list',
  templateUrl: './active-borrow-list.component.html',
  styleUrls: ['./active-borrow-list.component.css']
})
export class ActiveBorrowListComponent {
  borrows: Borrow[] = [];
  bookDetailsArray: Book[] = [];  
  userDetailsArray: User[] = [];
  activeBorrows: Array<{ borrow: Borrow, bookTitle: string, userName: string }> = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private borrowService: BorrowService,
    private userService: UserService,
    private bookService: BookService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadActiveBorrows();

    this.subscription.add(
      this.borrowService.bookReturned$.subscribe(() => {
        this.loadActiveBorrows();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  loadActiveBorrows(): void {
    this.borrowService.getActiveBorrows().subscribe(borrows => {
      this.borrows = borrows;

      let bookRequests = borrows.map(borrow => this.bookService.getBookById(borrow.id.bookId));
      let userRequests = borrows.map(borrow => this.userService.getUserById(borrow.id.userId));

      forkJoin([...bookRequests, ...userRequests]).subscribe(responses => {
        let booksLength = bookRequests.length;

        this.bookDetailsArray = <Book[]>responses.slice(0, booksLength);
        this.userDetailsArray = <User[]>responses.slice(booksLength);

        this.activeBorrows = this.borrows.map((borrow, index) => ({
          borrow: {
            ...borrow,
            borrowDate: this.datePipe.transform(borrow.borrowDate, 'dd/MM/yyyy') || borrow.borrowDate,
            returnDate: borrow.returnDate ? this.datePipe.transform(borrow.returnDate, 'dd/MM/yyyy') : null
          },
          bookTitle: this.bookDetailsArray[index]?.title || "Unknown title",
          userName: `${this.userDetailsArray[index]?.firstname || ''} ${this.userDetailsArray[index]?.lastname || ''}`.trim() || "Unknown user"
        }));
      });
    });
  }
}
