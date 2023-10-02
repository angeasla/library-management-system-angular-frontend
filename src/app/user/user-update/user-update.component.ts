import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'projects/shared/src/public-api';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userForm: FormGroup;
  userId: number | null = null;
  user: User | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {
    this.userId = data.userId;
    this.userForm = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
    });
   }

   ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userForm.patchValue({
          'firstname': user.firstname,
          'lastname': user.lastname,
          'email': user.email,
          'phone': user.phone
        });
      });
    }
  }

  updateUser(): void {
    if (this.userForm.valid && this.userId) {
      const userData = {...this.userForm.value};

      this.userService.updateUser(this.userId, userData).subscribe(() => {
          this.snackBar.open('User updated successfully!', '', {
              duration: 2000
          });
          this.router.navigate(['/user/users-list']);
          this.dialogRef.close();
      });
   }
  }  

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

