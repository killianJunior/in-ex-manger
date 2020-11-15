import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Expense } from '../data-model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  // private baseUrl = 'api/exData' api/dailyIncomes/dailyIncomes;
  private baseUrl = 'api/expenses/'

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseUrl + 'expenses');
  }

  getExpensesByDate(date: Date): Observable<Expense[]>{
    return this.http.get<Expense[]>(this.baseUrl).pipe(
      map(data => {
        return data.filter(d => d.date === date);
      })
    );
  }

  getExpenseDetail(id: string): Observable<Expense> {
    return this.http.get<Expense>(this.baseUrl + 'expense/' + id);
  }

  addExpense(expense: Expense): Observable<Expense> {
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Expense>(this.baseUrl + 'addExpense', expense, { headers });
  }

  updateExpense(expense: Expense): Observable<Expense> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Expense>(this.baseUrl + 'updateExpense/' + expense.id, expense, { headers });
  }

  deleteExpense(expense: Expense): Observable<{}> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Expense>(this.baseUrl + 'deleteExpense' + expense.id,
      httpOptions);
  }

}
