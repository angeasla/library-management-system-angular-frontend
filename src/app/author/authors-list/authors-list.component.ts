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
  totalAuthors = 0;
  pageSize = 10;
  currentPage = 0;
  pageNumbers: number[] = [];
  searchedAuthor: Author | null = null;

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getAllAuthorsWithPagination(this.currentPage);
  }

  getAllAuthors(): void {
    this.authorService.getAllAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  getAllAuthorsWithPagination(page: number): void {
    this.authorService.getAllAuthorsWithPagination(page, this.pageSize).subscribe({
      next: response => {
          this.authors = response.content;
          this.totalAuthors = response.totalElements; 
          this.pageNumbers = Array.from({length: response.totalPages}, (_, i) => i);
      },
      error: error => {
          console.error("Error fetching authors:", error);
      }
    });
  }

  openUpdateDialog(authorId: number): void {
    const dialogRef = this.dialog.open(AuthorUpdateComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: { authorId: authorId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllAuthors();
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AuthorInsertComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: { authorId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllAuthors();
    });
  }

  onPageChange(newPage: number): void {
    if(newPage >= 0 && newPage < this.pageNumbers.length) {
      this.currentPage = newPage;
      // Fetch the authors for the new page by calling an API with pagination.
      this.getAllAuthorsWithPagination(newPage);
    }
  }

  displaySearchedAuthor(author: Author): void {
    this.searchedAuthor = author;
  }

  backToAuthorsList(): void {
    this.searchedAuthor = null;
  }
}
