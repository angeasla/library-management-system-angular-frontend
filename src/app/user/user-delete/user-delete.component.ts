import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {
  @Input() userId!: number;
  @Output() onDeleted = new EventEmitter<void>();

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe(() => {
      console.log("Delete button clicked");
      this.snackBar.open('User deleted successfully!', '', {
        duration: 4000,
      });
      this.onDeleted.emit();
    });
  }
}
