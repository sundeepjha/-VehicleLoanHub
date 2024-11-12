import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  public apiUrl = "https://8080-dcecdfbffdaeefcecbbdecaadcacfbcbacceeeafb.premiumproject.examly.io/loan";

  constructor(private http:HttpClient) { }

  getLoanById(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/getLoanById/${id}`);
  }

  addLoan(loan: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/addLoan`,loan);
  }

  updateLoan(id: string, loan: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/updateLoan/${id}`,loan);
  }

  getAllLoans(): Observable<any>{
    return this.http.get(`${this.apiUrl}/getAllLoans`);
  }

  deleteLoan(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteLoan/${id}`)
  }
  
}
