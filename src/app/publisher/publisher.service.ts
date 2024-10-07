import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Publisher } from 'projects/shared/src/public-api';
import {environment} from "../../environments/environment";

const PUBLISHERS_API = `${environment.apiUrl}/publishers`
const BOOKS_API = `${environment.apiUrl}/books`

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }

  getAllPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${PUBLISHERS_API}`);
  }

  getAllPublishersWithPagination(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));

    return this.http.get<any>(`${PUBLISHERS_API}/pagination`, { params });
  }

  getPublisherById(publisherId: number): Observable<Publisher> {
    return this.http.get<Publisher>(`${PUBLISHERS_API}/${publisherId}`);
  }

  createPublisher(publisher: Partial<Publisher>): Observable<Publisher> {
    return this.http.post<Publisher>(`${PUBLISHERS_API}`, publisher);
  }

  updatePublisher(publisherId: number, publisher: Publisher): Observable<Publisher> {
    return this.http.put<Publisher>(`${PUBLISHERS_API}/${publisherId}`, publisher);
  }

  deletePublisher(publisherId: number): Observable<void> {
    return this.http.delete<void>(`${PUBLISHERS_API}/${publisherId}`);
  }

  findBooksByPublisherId(publisherId: number): Observable<any> {
    return this.http.get<any>(`${BOOKS_API}/by-publisher/${publisherId}`);
  }

  getPublisherByName(name: string): Observable<Publisher> {
    return this.http.get<Publisher>(`${PUBLISHERS_API}/search-by-name/${name}`).pipe(
      tap(data => {
          console.log('Data received:', data);
      }),
      catchError(err => {
          console.error('Error occurred:', err);
          return throwError(err);
      })
    );
  }

  countPublishers(): Observable<number> {
    return this.http.get<number>(`${PUBLISHERS_API}/count/total`);
  }
}
