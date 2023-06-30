import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from 'projects/shared/src/public-api';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar, 
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
          this.router.navigate(['/listUser']);
        });
      }
    }
    
}


