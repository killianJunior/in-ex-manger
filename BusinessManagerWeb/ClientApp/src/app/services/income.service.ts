import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Income } from '../data-model/income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

   //private baseUrl = 'api/inData';
   private baseUrl = 'api/dailyIncomes'

  constructor(private http: HttpClient) { }

  getIncomeHistory(): Observable<Income[]> {
    return this.http.get<Income[]>(this.baseUrl).pipe(
      tap(data => console.log('Successful')),
      catchError(this.handleError)
    )
  };

  addIncome(income: Income): Observable<Income> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    income.id = null;
    return this.http.post<Income>(this.baseUrl, income, { headers })
      .pipe(
        tap(data => console.log('Successful' + JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  getIncomeDetail(id: number): Observable<Income> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Income>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }



}
