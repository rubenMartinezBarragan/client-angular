import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError} from 'rxjs';
import { Category } from './model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/category');
  }

  saveCategory(category: Category): Observable<Category> {
    let url = 'http://localhost:8080/category';
    if (category.id != null) url += '/'+category.id;

    return this.http
                .put<Category>(url, category)
                .pipe(
                  catchError(this.errorHandler)
                );
  }

  deleteCategory(idCategory : number): Observable<any> {
    return this.http.delete('http://localhost:8080/category/'+idCategory);
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message);
  }
}
