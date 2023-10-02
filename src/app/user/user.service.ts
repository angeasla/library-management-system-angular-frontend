import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
