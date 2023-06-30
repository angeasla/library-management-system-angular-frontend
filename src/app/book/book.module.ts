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
  { path: 'listBook', component: BooksListComponent },
  { path: 'createBook', component: BookInsertComponent },
  { path: 'updateBook/:bookId', component: BookUpdateComponent },
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
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatSnackBarModule,
  ],

  providers: [ BookService ],
  exports: [ BooksListComponent, BookInsertComponent ]
})
export class BookModule { }
