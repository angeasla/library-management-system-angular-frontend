import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './book.service';
import { BookInsertComponent } from './book-insert/book-insert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookUpdateComponent } from './book-update/book-update.component';



const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BooksListComponent },
  { path: 'create', component: BookInsertComponent },
  { path: 'update/:bookId', component: BookUpdateComponent },
]

@NgModule({
  declarations: [
    BooksListComponent,
    BookInsertComponent,
    BookDeleteComponent,
    BookUpdateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatSnackBarModule,
  ],

  providers: [ BookService ],
  exports: [ BooksListComponent, BookInsertComponent, RouterModule ]
})
export class BookModule { }
