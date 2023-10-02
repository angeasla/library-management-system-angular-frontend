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
import { MatDialogModule } from '@angular/material/dialog';
import { UserActiveBorrowsComponent } from './user-active-borrows/user-active-borrows.component';
import { BorrowModule } from '../borrow/borrow.module';
import { BorrowService } from '../borrow/borrow.service';

const routes: Routes = [

  { path: '', redirectTo: 'users-list', pathMatch: 'full' },
  { path: 'users-list', component: UsersListComponent },
  { path: 'create-user', component: UserInsertComponent },
  { path: 'update-user/:userId', component: UserUpdateComponent },
  { path: 'users-list/:userId/active-borrows', component: UserActiveBorrowsComponent }
]

@NgModule({
  declarations: [
    UsersListComponent,
    UserInsertComponent,
    UserDeleteComponent,
    UserUpdateComponent,
    UserActiveBorrowsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    BorrowModule
  ],

  providers: [UserService, BorrowService],
  exports: [UsersListComponent, UserInsertComponent, RouterModule]
})

export class UserModule { }
