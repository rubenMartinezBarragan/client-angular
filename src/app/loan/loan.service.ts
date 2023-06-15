import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';

@Injectable({
    providedIn: 'root'
})
export class LoanService {
    constructor(private http: HttpClient) { }

    getLoans(pageable: Pageable): Observable<LoanPage> {
      return this.http.post<LoanPage>('http://localhost:8080/loan', {pageable:pageable});
    }

    getLoansFilter(idGame?: Number, idClient?: Number, dateSearch?: String): Observable<Loan[]> {            
      return this.http.get<Loan[]>(this.composeFindUrl(idGame, idClient, dateSearch));
    }

    private composeFindUrl(idGame?: Number, idClient?: Number, dateSearch?: String) : string {
      let params = '';

      if (idGame != null) {
          params += 'idGame='+idGame;
      }

      if (idClient != null) {
          if (params != '') params += "&";
          params += "idClient="+idClient;
      }

      if (dateSearch != null) {
        if (params != '') params += "&";
        params += "dateSearch="+dateSearch;
      }

      let url = 'http://localhost:8080/loan'

      if (params == '') return url;
      else return url + '?'+params;
    }

    saveLoan(loan: Loan): Observable<void> {
      let url = 'http://localhost:8080/loan/save';
      if (loan.id != null) url += '/'+loan.id;

      return this.http
                  .post<void>(url, loan)
                  .pipe(
                    catchError(this.errorHandler)
                  );
    }

    deleteLoan(idLoan : number): Observable<void> {
      return this.http.delete<void>('http://localhost:8080/loan/'+idLoan);
    }

    getAllLoans(): Observable<Loan[]> {
      return this.http.get<Loan[]>('http://localhost:8080/loan');
    }

    errorHandler(error: HttpErrorResponse){
      return observableThrowError(error.message);
    }
}