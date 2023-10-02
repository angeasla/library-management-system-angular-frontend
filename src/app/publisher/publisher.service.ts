import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publisher } from 'projects/shared/src/public-api';

const PUBLISHERS_API = 'http://localhost:8080/api/publishers'
const BOOKS_API = 'http://localhost:8080/api/books'

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }

  getAllPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${PUBLISHERS_API}`);
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
}
