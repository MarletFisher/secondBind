import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor() {}

  // This service focuses on calling the API methods that return data related to book entries. For example, the filter method that returns all matches for the search query, and the insertBook method that confirms whether or not I completed the adding the book to the DB.

  private http = inject(HttpClient);

  serverURL = 'http://localhost:8080';

  addBook(bookDetails: any) {
    console.log('addBook service called');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      this.serverURL + '/addBook',
      bookDetails,
      httpOptions
    );
  }

  filterBooks(filterCriteria: any) {
    console.log('filterCriteria service called');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log('Calling', this.serverURL + '/filterCriteria');
    return this.http.post(
      this.serverURL + '/filterCriteria',
      filterCriteria,
      httpOptions
    );
  }
}
