import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrow } from 'projects/shared/src/lib/borrow.interfaces';

@Injectable()
export class BorrowService {
  private API_URL = 'http://localhost:8080/api/borrows/';

  constructor(private http: HttpClient) {}

  borrowBooks(userId: number, bookTitles: string[]): Observable<any> {
    const borrowRequest = {
      user: userId,
      books: bookTitles,
    };

    return this.http.post(this.API_URL, borrowRequest);
  }

  getAllBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.API_URL}`);
  }

  returnBorrow(borrowedBookId: number): Observable<any> {
    return this.http.put(`${this.API_URL}return/${borrowedBookId}`, {});
  }

}
