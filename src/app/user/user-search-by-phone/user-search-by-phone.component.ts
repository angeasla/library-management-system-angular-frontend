import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { User } from 'projects/shared/src/public-api';

@Component({
  selector: 'app-user-search-by-phone',
  templateUrl: './user-search-by-phone.component.html',
  styleUrls: ['./user-search-by-phone.component.css']
})

export class UserSearchByPhoneComponent implements OnInit {
  @Output() userFound = new EventEmitter();
  phone: string = '';
  user: User | null = null;

  constructor(
    private userService: UserService
    ) {}

  ngOnInit(): void {}

  search(): void {
    this.userService.getUserByPhone(this.phone).subscribe(
      user => this.userFound.emit(user),
      error => console.error('Error fetching user by phone:', error)
    );
  }
}
