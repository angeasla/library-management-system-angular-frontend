import {Component, OnInit} from '@angular/core';
import { BookService } from "../../book/book.service";
import { UserService } from "../../user/user.service";
import {AuthorService} from "../../author/author.service";
import {PublisherService} from "../../publisher/publisher.service";
import {BorrowService} from "../../borrow/borrow.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{

  countBooks: number = 0;
  countUsers: number = 0;
  countAuthors: number = 0;
  countPublishers: number = 0;
  countAllBorrows: number = 0;
  countActiveBorrows: number = 0;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private borrowService: BorrowService
  ) {
  }

  ngOnInit() {
    this.bookService.countBooks().subscribe(
      (totalBooks: number) => {
        this.countBooks = totalBooks;
      }
    );

    this.userService.countUsers().subscribe(
      (totalUsers: number) => {
        this.countUsers = totalUsers;
      }
    );

    this.authorService.countAuthors().subscribe(
      (totalAuthors: number) => {
        this.countAuthors = totalAuthors;
      }
    );

    this.publisherService.countPublishers().subscribe(
      (totalPublishers: number) => {
        this.countPublishers = totalPublishers;
      }
    );

    this.borrowService.countTotalBorrows().subscribe(
      (totalBorrows: number) => {
        this.countAllBorrows = totalBorrows;
      }
    );

    this.borrowService.countActiveBorrows().subscribe(
      (totalActiveBorrows: number) => {
        this.countActiveBorrows = totalActiveBorrows;
      }
    );
  }
}
