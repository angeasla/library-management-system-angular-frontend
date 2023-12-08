import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from 'projects/shared/src/public-api';

const USERS_API = 'http://localhost:8080/api/users'
const BORROW_API = 'http://localhost:8080/api/borrows'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${USERS_API}`);
  }

  getAllUsersWithPagination(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));

    return this.http.get<any>(`${USERS_API}/pagination`, { params });
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${USERS_API}/${userId}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${USERS_API}`, user);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${USERS_API}/${userId}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${USERS_API}/${userId}`);
  }

  getActiveBorrowsByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${BORROW_API}/active/user/${userId}`);
  }

  getUserByPhone(phone: string): Observable<User> {
    return this.http.get<User>(`${USERS_API}/search-by-phone/${phone}`).pipe(
        tap(data => {
            console.log('Data received:', data);
        }),
        catchError(err => {
            console.error('Error occurred:', err);
            return throwError(err);
        })
    );
  }

  countUsers(): Observable<number> {
    return this.http.get<number>(`${USERS_API}/count/total`);
  }
}
