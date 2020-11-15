import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Genexpense } from '../data-model/genexpense';

@Injectable({
  providedIn: 'root'
})
export class GenexpenseService {

  private baseUrl = 'api/generalExpense/';

  /*private baseUrl = ' ';*/

  constructor(private http: HttpClient) {
  }

  #region

  getGenExpenses():Observable<Genexpense[]> {
    return this.http.get<Genexpense[]>(this.baseUrl + 'genExpenses');
  }

  addGenExpense(genEx: Genexpense): Observable<Genexpense> {
    const headers = new HttpHeaders({ 'Context-Type': 'application.json' });
    return this.http.post<Genexpense>(this.baseUrl + 'addGenExpense', genEx, { headers });
  }

  getGenExpenseDetail(id: string): Observable<Genexpense> {
    return this.http.get<Genexpense>(this.baseUrl + 'genExpense/' + id);
  }

  updateGenEx(genEx: Genexpense): Observable<Genexpense> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Genexpense>(this.baseUrl + 'updateGenExpense/' + genEx.id, genEx, { headers });
  }

  /*deleteGenEx(genEx: Genexpense): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<Genexpense>(this.baseUrl + 'deleteGenExpense', genEx.id, genEx, { headers });
  }*/

  deleteGenExpense(genEx: Genexpense): Observable<{}> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Genexpense>(this.baseUrl + 'deleteGenExpense' + genEx.id,
      httpOptions);
  }

  #endregion


}


