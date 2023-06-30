import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userForm: FormGroup;
  userId: number | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
    });
   }

   ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.userId = Number(userId); 
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userForm.setValue({
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
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
        this.snackBar.open('User updated successfully!', '', {
          duration: 2000
        });
        this.router.navigate(['/user/list']);
      });
    }
  }  
}
