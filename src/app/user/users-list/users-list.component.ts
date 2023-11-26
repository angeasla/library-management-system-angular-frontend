import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'projects/shared/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { UserInsertComponent } from '../user-insert/user-insert.component';
import { UserActiveBorrowsComponent } from '../user-active-borrows/user-active-borrows.component';
import {UserBorrowsHistoryComponent} from "../user-borrows-history/user-borrows-history.component";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;
  pageNumbers: number[] = [];
  searchedUser: User | null = null;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private cdRef:ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.getAllUsersWithPagination(this.currentPage);
    this.cdRef.detectChanges();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  getAllUsersWithPagination(page: number): void {
    this.userService.getAllUsersWithPagination(page, this.pageSize).subscribe({
      next: response => {
        this.users = response.content.map((user: { borrows: { filter: (arg0: (borrow: { returned: any; }) => boolean) => { (): any; new(): any; length: any; }; }; }) => ({
          ...user,
          activeBorrowCount: user.borrows.filter((borrow: { returned: any; }) => !borrow.returned).length
        }));
        this.totalUsers = response.totalElements;
        this.pageNumbers = Array.from({length: response.totalPages}, (_, i) => i);
        console.log(this.users);
      },
      error: error => {
        console.error("Error fetching users:", error);
      }
    });
  }

  openUpdateDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsersWithPagination(0);
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserInsertComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: { userId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsersWithPagination(0);
    });
  }

  openActiveBorrowsDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserActiveBorrowsComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsersWithPagination(0);
    });
  }

  openBorrowsHistoryDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserBorrowsHistoryComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: { userId: userId}
    });
  }

  onPageChange(newPage: number): void {
    if(newPage >= 0 && newPage < this.pageNumbers.length) {
      this.currentPage = newPage;
      // Fetch the users for the new page by calling an API with pagination.
      this.getAllUsersWithPagination(newPage);
    }
  }

  displaySearchedUser(user: User): void {
    this.searchedUser = user;
  }

  backToUsersList(): void {
    this.searchedUser = null;
  }
}
