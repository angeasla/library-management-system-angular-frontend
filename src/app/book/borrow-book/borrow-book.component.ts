import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { BookService } from '../book.service';
import { User } from 'projects/shared/src/public-api';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var bootstrap: any;

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {
  users: User[] = [];
  selectedBookId: number | null = null;
  selectedUserId: number | null = null;
  selectedUserPhone: string | null = null;
  private modalInstance?: any;

  @Output() bookBorrowed: EventEmitter<void> = new EventEmitter();

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  openModal(bookId: number): void {
    this.selectedUserId = null;
    this.getAllUsers();
    this.selectedBookId = bookId;
    const modalElement = document.getElementById('borrowBookModal');
    if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();
    }
  }

  // borrow(): void {
  //     if (this.selectedBookId !== null && this.selectedUserId !== null) {
  //       this.bookService.borrowBook(this.selectedUserId, this.selectedBookId).subscribe({
  //           next: response => {
  //               console.log('Borrowed successfully:', response);
  //               if (this.modalInstance) {
  //                   this.modalInstance.hide();
  //               }
  //               this.bookBorrowed.emit();
  //               this.snackBar.open(' Book borrowed successfully!', '', {
  //                 duration: 4000,
  //               });
  //           },
  //           error: error => {
  //             console.error('Error borrowing book:', error);
  //             this.snackBar.open('Error in borrowing book', '', {
  //               duration: 4000,
  //             });
  //           }
  //       });
  //     } else {
  //       console.warn('User or Book ID not selected.');
  //   }
  // }

  borrowBook(): void {
    const selectedUser = this.users.find(user => this.selectedUserPhone === user.phone + ' | ' + user.firstname + ' ' + user.lastname);

    if (selectedUser) {
      this.selectedUserId = selectedUser.userId;
    } else {
      this.selectedUserId = null;
    }

    if (this.selectedBookId !== null && this.selectedUserId !== null) {
      this.bookService.borrowBook(this.selectedUserId, this.selectedBookId).subscribe({
        next: response => {
          console.log('Borrowed successfully:', response);
          if (this.modalInstance) {
            this.modalInstance.hide();
          }
          this.bookBorrowed.emit();
          this.snackBar.open(' Book borrowed successfully!', '', {
            duration: 4000,
          });
        },
        error: error => {
          console.error('Error borrowing book:', error);
          this.snackBar.open('Error in borrowing book', '', {
            duration: 4000,
          });
        }
      });
    } else {
      console.warn('User or Book ID not selected.');
    }
  }

  updateSelectedUserId(): void {
    const selectedUser = this.users.find(user => this.selectedUserPhone === user.phone + ' | ' + user.firstname + ' ' + user.lastname);

    if (selectedUser) {
      this.selectedUserId = selectedUser.userId;
    } else {
      this.selectedUserId = null;
    }
  }


}
