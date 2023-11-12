import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublisherService } from './publisher.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PublisherInsertComponent } from './publisher-insert/publisher-insert.component';
import { PublisherUpdateComponent } from './publisher-update/publisher-update.component';
import { PublisherDeleteComponent } from './publisher-delete/publisher-delete.component';
import { PublishersListComponent } from './publishers-list/publishers-list.component';
import { BooksByPublisherComponent } from './books-by-publisher/books-by-publisher.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BookService } from '../book/book.service';
import { BookModule } from '../book/book.module';
import { PublisherSearchByNameComponent } from './publisher-search-by-name/publisher-search-by-name.component';

const routes: Routes = [

  { path: '', redirectTo: 'publishers-list', pathMatch: 'full' },
  { path: 'publishers-list', component: PublishersListComponent },
  { path: 'books-by-publisher/:publisherId', component: BooksByPublisherComponent },
  { path: 'create-publisher', component: PublisherInsertComponent },
  { path: 'update-publisher/:publisherId', component: PublisherUpdateComponent },
]

@NgModule({
  declarations: [
    PublishersListComponent,
    PublisherInsertComponent,
    PublisherUpdateComponent,
    PublisherDeleteComponent,
    BooksByPublisherComponent,
    PublisherSearchByNameComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    BookModule,
    FormsModule
  ],

  providers: [PublisherService, BookService],
  exports: [PublishersListComponent, PublisherInsertComponent, RouterModule]
})
export class PublisherModule { }
