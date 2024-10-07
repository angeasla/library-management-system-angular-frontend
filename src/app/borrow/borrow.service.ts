import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Borrow, Book, User } from 'projects/shared/src/public-api';
import {environment} from "../../environments/environment";

const BORROW_API = `${environment.apiUrl}/borrows`;

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  private bookReturnedSubject = new Subject<void>();
  public bookReturned$ = this.bookReturnedSubject.asObservable();

  constructor(private http: HttpClient) {}

  borrowBooks(userId: number, bookTitles: string[]): Observable<any> {
    const borrowRequest = {
      user: userId,
      books: bookTitles,
    };

    return this.http.post(BORROW_API, borrowRequest);
  }

  returnBook(userId: number, bookId: number): Observable<any> {
    const returnRequest = {
      userId: userId,
      bookId: bookId
    };

    return this.http.post(`${BORROW_API}/return`, returnRequest)
    .pipe(
      tap(() => {
        this.bookReturnedSubject.next();
      })
    );
  }

  getActiveBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${BORROW_API}/active`);
}

  returnBorrow(borrowedBookId: number): Observable<any> {
    return this.http.put(`${BORROW_API}return/${borrowedBookId}`, {});
  }

  getActiveBorrowsByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${BORROW_API}/active/user/${userId}`);
  }

  getBorrowsHistoryByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${BORROW_API}/history/user/${userId}`);
  }

  getBorrowsHistory(): Observable<Borrow[]> {
      return this.http.get<Borrow[]>(`${BORROW_API}/history`);
  }

  countTotalBorrows(): Observable<number> {
    return this.http.get<number>(`${BORROW_API}/count/total`);
  }

  countActiveBorrows(): Observable<number> {
    return this.http.get<number>(`${BORROW_API}/count/active`);
  }
}
