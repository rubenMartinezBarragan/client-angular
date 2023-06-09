import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError} from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Author } from './model/Author';
import { AuthorPage } from './model/AuthorPage';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    constructor(private http: HttpClient) { }

    getAuthors(pageable: Pageable): Observable<AuthorPage> {
      return this.http.post<AuthorPage>('http://localhost:8080/author', {pageable:pageable});
    }

    saveAuthor(author: Author): Observable<void> {
      let url = 'http://localhost:8080/author';
      if (author.id != null) url += '/'+author.id;

      return this.http
                  .put<void>(url, author)
                  .pipe(
                    catchError(this.errorHandler)
                  );
    }

    deleteAuthor(idAuthor : number): Observable<void> {
      return this.http.delete<void>('http://localhost:8080/author/'+idAuthor);
    }

    getAllAuthors(): Observable<Author[]> {
      return this.http.get<Author[]>('http://localhost:8080/author');
    }

    errorHandler(error: HttpErrorResponse){
      return observableThrowError(error.message);
    }
}