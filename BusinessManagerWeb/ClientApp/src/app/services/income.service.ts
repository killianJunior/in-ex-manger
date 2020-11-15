import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Income } from '../data-model/income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private baseUrl = 'api/dailyIncomes/'

  constructor(private http: HttpClient) { }

  getIncomeHistory(): Observable<Income[]> {
    return this.http.get<Income[]>(this.baseUrl + 'dailyIncomes');
  };

  createIncome(income: Income): Observable<Income> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Income>(this.baseUrl + 'addDailyIncome', income, { headers });
  }


  getIncomeDetail(id: string): Observable<Income> {
    return this.http.get<Income>(this.baseUrl + 'dailyIncome/' + id);
  }

  updateIncome(income: Income): Observable<Income> {
    console.log(income);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Income>(this.baseUrl + 'updateIncome/' + income.id, income, { headers });
  }

  deleteIncome(income: Income): Observable<{}> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Income>(this.baseUrl + 'deleteIncome' + income.id,
      httpOptions);
  }  


}
