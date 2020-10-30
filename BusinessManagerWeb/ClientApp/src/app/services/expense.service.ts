import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Expense } from '../data-model/expense';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseExUrl = 'api/exData';

  constructor(private http: HttpClient) { }



  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseExUrl).pipe(
      tap(data => console.log('Successful')),
      catchError(this.handleError)
    );
  }

  getExpensesByDate(date:string): Observable<Expense[]>{
    return this.http.get<Expense[]>(this.baseExUrl).pipe(
      map(data => {
        return data.filter(d => d.expenseDate === date);
      })
    );
  }


  addExpense(expense: Expense): Observable<Expense> {
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   expense.id = null;
   return this.http.post<Expense>(this.baseExUrl, expense, { headers })
    .pipe(
      tap(data => console.log('Successful!!')),
      catchError(this.handleError)
    )
  }

  private handleError(err): Observable<never> {

    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
