import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule} from '@angular/material/autocomplete'
import { ReactiveFormsModule } from '@angular/forms';
import { BorrowService } from './borrow.service';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActiveBorrowListComponent } from './active-borrow-list/active-borrow-list.component';
import { DatePipe } from '@angular/common';
import { ReturnBookComponent } from './return-book/return-book.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';



const routes: Routes = [
  
  { path: '', redirectTo: 'active-borrows-list', pathMatch: 'full' },
  { path: 'active-borrows-list', component: ActiveBorrowListComponent },
  
]

@NgModule({
  declarations: [
    ActiveBorrowListComponent,
    ReturnBookComponent,
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    HttpClientModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule
  ],

  providers: [BorrowService, UserService, BookService, DatePipe],
  exports: [ RouterModule, ReturnBookComponent]
})
export class BorrowModule { }
