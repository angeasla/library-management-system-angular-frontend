import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from 'projects/shared/src/public-api';

const AUTHORS_API = 'http://localhost:8080/api/authors'
const BOOKS_API = 'http://localhost:8080/api/books'

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${AUTHORS_API}`);
  }

  getAllAuthorsWithPagination(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));

    return this.http.get<any>(`${AUTHORS_API}/pagination`, { params });
  }  

  getAuthorById(authorId: number): Observable<Author> {
    return this.http.get<Author>(`${AUTHORS_API}/${authorId}`);
  }

  createAuthor(author: Partial<Author>): Observable<Author> {
    return this.http.post<Author>(`${AUTHORS_API}`, author);
  }

  updateAuthor(authorId: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${AUTHORS_API}/${authorId}`, author);
  }

  deleteAuthor(authorId: number): Observable<void> {
    return this.http.delete<void>(`${AUTHORS_API}/${authorId}`);
  }

  findBooksByAuthorId(authorId: number): Observable<any> {
    return this.http.get<any>(`${BOOKS_API}/by-author/${authorId}`);
  }
}
