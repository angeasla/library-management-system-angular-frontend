import { NgModule, Inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersListComponent } from './users-list/users-list.component';
import { UserInsertComponent } from './user-insert/user-insert.component';
import { UserService } from './user.service';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  { path: 'listUser', component: UsersListComponent },
  { path: 'createUser', component: UserInsertComponent },
  { path: 'updateuser/:userId', component: UserUpdateComponent },
]

@NgModule({
  declarations: [
    UsersListComponent,
    UserInsertComponent,
    UserDeleteComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule, 
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatSnackBarModule,
  ],

  providers: [UserService],
  exports: [UsersListComponent, UserInsertComponent, RouterModule]
})

export class UserModule { }
