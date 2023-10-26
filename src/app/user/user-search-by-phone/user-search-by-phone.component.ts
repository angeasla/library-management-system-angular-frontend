import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { User } from 'dist/shared/public-api';

@Component({
  selector: 'app-user-search-by-phone',
  // templateUrl: './user-search-by-phone.component.html',
  template: `
    <input [(ngModel)]="phone" placeholder="Search by phone" />
    <button (click)="search()" class="btn btn-primary mb-3 ml-3">Search</button>
  `
  // styleUrls: ['./user-search-by-phone.component.css']
})
export class UserSearchByPhoneComponent {
  @Output() userFound = new EventEmitter();
  phone: string = '';
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  search(): void {
    this.userService.getUserByPhone(this.phone).subscribe(
      user => this.userFound.emit(user),
      error => console.error('Error fetching user by phone:', error)
    );
  }

//   searchUserByPhone(): void {
//     this.userService.getUserByPhone(this.phone).subscribe(
//         (user: User) => {
//             console.log('User found:', user);
//             // Εδώ προσθέστε τον κώδικα για να εμφανίσετε τον χρήστη στο UI
//         },
//         error => {
//             console.error('Error fetching user by phone:', error);
//         }
//     );
// }

}
