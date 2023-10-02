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

  constructor(
    private userService: UserService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    console.log("UsersListComponent Initiated");
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  openUpdateDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      minWidth: '50%',
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserInsertComponent, {
      minWidth: '50%',
      data: { userId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }

  openActiveBorrowsDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserActiveBorrowsComponent, {
      minWidth: '70%',
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }
}
