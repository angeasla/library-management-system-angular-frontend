import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Author } from 'projects/shared/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { AuthorUpdateComponent } from '../author-update/author-update.component';
import { AuthorInsertComponent } from '../author-insert/author-insert.component';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {
  authors: Author[] = [];

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getAllAuthors();
  }

  getAllAuthors(): void {
    this.authorService.getAllAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  openUpdateDialog(authorId: number): void {
    const dialogRef = this.dialog.open(AuthorUpdateComponent, {
      minWidth: '50%',
      data: { authorId: authorId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllAuthors();
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AuthorInsertComponent, {
      minWidth: '50%',
      data: { authorId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllAuthors();
    });
  }
}
