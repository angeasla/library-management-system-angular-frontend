// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, Book, Publisher } from 'projects/shared/src/public-api'; 

const BOOKS_API = 'http://localhost:8080/api/books';
const AUTHORS_API = 'http://localhost:8080/api/authors';
const PUBLISHERS_API = 'http://localhost:8080/api/publishers';
const BORROWS_API = 'http://localhost:8080/api/borrows';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${BOOKS_API}`);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${BOOKS_API}/${bookId}`);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${BOOKS_API}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${BOOKS_API}/${id}`);
  }

  updateBook(bookId: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${BOOKS_API}/${bookId}`, book);
  }

  search(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${BOOKS_API}/title/${title}`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${AUTHORS_API}`);
  }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${PUBLISHERS_API}`);
  }

  borrowBook(userId: number, bookId: number): Observable<any> {
    const borrowRequest = {
      userId: userId,
      bookId: bookId
    };

    return this.http.post(`${BORROWS_API}/borrow`, borrowRequest);
  }
}
