import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}

  getGenres(): Observable<any> {
    console.log('In genreService(), fetching genres()');
    let genre$ = this.http.get('http://localhost:8080/getAllGenres');
    console.log(genre$);
    return genre$;
  }
}
