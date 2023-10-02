import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from 'projects/shared/src/public-api';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent {
  users: User[] = [];
  userId: number | null = null;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<UserInsertComponent>,
    private router: Router) { }

    userForm = new FormGroup({
      firstname: new FormControl('',),
      lastname: new FormControl('', Validators.required),
      email: new FormControl(''),
      phone: new FormControl('', Validators.required),
    });

    onSubmit() {
      if (this.userForm.valid) {
        this.userService.createUser(this.userForm.value as Partial<User>).subscribe(user => {
          this.users.push(user); 
          this.snackBar.open('User created successfully!', '', {
            duration: 4000, 
          });
          this.dialogRef.close();
        });
      }
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }
}


