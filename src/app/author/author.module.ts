import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorService } from './author.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { AuthorInsertComponent } from './author-insert/author-insert.component';
import { AuthorDeleteComponent } from './author-delete/author-delete.component';
import { AuthorUpdateComponent } from './author-update/author-update.component';
import { BooksByAuthorComponent } from './books-by-author/books-by-author.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BookService } from '../book/book.service';
import { BookModule } from '../book/book.module';
import { AuthorSearchByLastnameComponent } from './author-search-by-lastname/author-search-by-lastname.component';
import {StatisticsModule} from "../statistics/statistics.module";
import { SharedTranslationModule } from '../shared/shared.module';

const routes: Routes = [

  { path: '', redirectTo: 'authors-list', pathMatch: 'full' },
  { path: 'authors-list', component: AuthorsListComponent },
  { path: 'books-by-author/:authorId', component: BooksByAuthorComponent},
  { path: 'create-author', component: AuthorInsertComponent },
  { path: 'update-author/:authorId', component: AuthorUpdateComponent },
]

@NgModule({
  declarations: [
    AuthorsListComponent,
    AuthorInsertComponent,
    AuthorDeleteComponent,
    AuthorUpdateComponent,
    BooksByAuthorComponent,
    AuthorSearchByLastnameComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        BookModule,
        FormsModule,
        StatisticsModule,
        SharedTranslationModule
    ],

  providers: [AuthorService, BookService],
  exports: [AuthorsListComponent, AuthorInsertComponent, RouterModule]
})
export class AuthorModule { }
