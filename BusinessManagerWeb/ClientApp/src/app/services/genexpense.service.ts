import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Genexpense } from '../data-model/genexpense';

@Injectable({
  providedIn: 'root'
})
export class GenexpenseService {

  private baseUrl = 'api/genData';

  constructor(private http: HttpClient) { }

  getGenExpenses():Observable<Genexpense[]> {
    return this.http.get<Genexpense[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      )
  }

  addGenExpense(genEx: Genexpense): Observable<Genexpense> {
    const headers = new HttpHeaders({ 'Context-Type': 'application.json' });
    genEx.id = null;
    return this.http.post<Genexpense>(this.baseUrl, genEx, { headers })
      .pipe(
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
