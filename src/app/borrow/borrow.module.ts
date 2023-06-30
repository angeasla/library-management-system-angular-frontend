import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowComponent } from './borrow/borrow.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete'
import { ReactiveFormsModule } from '@angular/forms';
import { BorrowService } from './borrow.service';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BorrowListComponent } from './borrow-list/borrow-list.component';




const routes: Routes = [
  { path: '', component: BorrowComponent },
  { path: 'listBorrow', component: BorrowListComponent },
  
]

@NgModule({
  declarations: [
    BorrowComponent,
    BorrowListComponent,
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    HttpClientModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  providers: [BorrowService, UserService, BookService],
  exports: [BorrowComponent, RouterModule]
})
export class BorrowModule { }
