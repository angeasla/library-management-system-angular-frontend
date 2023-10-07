import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'projects/shared/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { UserInsertComponent } from '../user-insert/user-insert.component';
import { UserActiveBorrowsComponent } from '../user-active-borrows/user-active-borrows.component';

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

  constructor(
    private userService: UserService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getAllUsersWithPagination(this.currentPage);
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  getAllUsersWithPagination(page: number): void {
    this.userService.getAllUsersWithPagination(page, this.pageSize).subscribe({
      next: response => {
          this.users = response.content;
          this.totalUsers = response.totalElements; 
          this.pageNumbers = Array.from({length: response.totalPages}, (_, i) => i);
      },
      error: error => {
          console.error("Error fetching users:", error);
      }
    });  
  }

  openUpdateDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      minWidth: '50%',
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsersWithPagination(0);
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserInsertComponent, {
      minWidth: '50%',
      data: { userId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsersWithPagination(0);
    });
  }

  openActiveBorrowsDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserActiveBorrowsComponent, {
      minWidth: '70%',
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsersWithPagination(0);
    });
  }

  onPageChange(newPage: number): void {
    if(newPage >= 0 && newPage < this.pageNumbers.length) {
      this.currentPage = newPage;
      // Fetch the users for the new page by calling an API with pagination.
      this.getAllUsersWithPagination(newPage);
    }
  }
}
