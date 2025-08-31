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
import { BorrowBookComponent } from './borrow-book/borrow-book.component';
import { BorrowModule } from '../borrow/borrow.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BookSearchByTitleComponent } from './book-search-by-title/book-search-by-title.component';
import {StatisticsModule} from "../statistics/statistics.module";
import { SharedTranslationModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'books-list', pathMatch: 'full' },
  { path: 'books-list', component: BooksListComponent },
  { path: 'create-book', component: BookInsertComponent },
  { path: 'update-book/:bookId', component: BookUpdateComponent },
]


@NgModule({
  declarations: [
    BooksListComponent,
    BookInsertComponent,
    BookDeleteComponent,
    BookUpdateComponent,
    BorrowBookComponent,
    BookSearchByTitleComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatSnackBarModule,
        BorrowModule,
        FormsModule,
        MatDialogModule,
        StatisticsModule,
        SharedTranslationModule,
    ],

  providers: [ BookService ],
  exports: [ BooksListComponent, BookInsertComponent, BookDeleteComponent, RouterModule ]
})
export class BookModule { }
