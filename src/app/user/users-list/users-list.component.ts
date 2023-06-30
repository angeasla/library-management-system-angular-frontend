import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'projects/shared/src/public-api';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log("UsersListComponent Initiated");
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
}
