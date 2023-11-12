import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Author } from 'projects/shared/src/public-api';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-search-by-lastname',
  templateUrl: './author-search-by-lastname.component.html',
  styleUrls: ['./author-search-by-lastname.component.css']
})
export class AuthorSearchByLastnameComponent implements OnInit {
  @Output() authorFound = new EventEmitter();
  lastname: string = '';
  author: Author | null = null;

  constructor(
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {}

  search(): void {
    this.authorService.getAuthorByLastname(this.lastname).subscribe(
      author => this.authorFound.emit(author),
      error => console.error('Error fetching publisher by name:', error)
    );
  }

}
