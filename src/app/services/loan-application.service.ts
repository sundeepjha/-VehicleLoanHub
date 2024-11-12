import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationService {
  public apiUrl = "https://8080-dcecdfbffdaeefcecbbdecaadcacfbcbacceeeafb.premiumproject.examly.io/loanApplication";
  constructor(private http : HttpClient) { }
  
  getAllLoanApplications(reqObj: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/getAllLoanApplications`,reqObj);
  }

  updateLoanApplication(id: string, requestObject: any):  Observable<any>{
    return this.http.put(`${this.apiUrl}/updateLoanApplication/${id}`,requestObject);
  }

  getLoanApplicationsByUserId(userId: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/getLoanApplicationsByUserId/${userId}`)
  }
  
  addLoanApplication(formData: FormData): Observable<any>{
    console.log(formData);
    return this.http.post(`${this.apiUrl}/addLoanApplication`,formData)
  }
  deleteLoanApplication(loanApplicationId: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/deleteLoanApplication/${loanApplicationId}`)
  }
  
}

