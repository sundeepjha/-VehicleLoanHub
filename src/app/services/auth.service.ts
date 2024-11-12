import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = "https://8080-dcecdfbffdaeefcecbbdecaadcacfbcbacceeeafb.premiumproject.examly.io/user"; 
  private token: string | null = null;
  private userRole = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, login).pipe(
      tap((response: any) => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
        localStorage.setItem("role", response.role);
        this.userRole.next(response.role);
        this.userId.next(response.id);
      })
    );
  }

  getRole(){
    return localStorage.getItem("role");
  }

  logout(){
    localStorage.clear();
  }

  isAuthenticated(){
    return this.getRole() !== null;
  }

  isUser(){
    return this.getRole() === "user";
  }

  isAdmin(){
    return this.getRole() === "admin";
  }
}




//   private tokenSubject = new BehaviorSubject<string | null>(null);
//   private token: Observable<string | null>;
//   private currentUserId = new BehaviorSubject<number | null>(null);
//   private currentUserName = new BehaviorSubject<string | null>(null);
 
 
//   constructor(private http: HttpClient) {
//     this.tokenSubject = new BehaviorSubject<string | null>(window.sessionStorage.getItem('token')|| 'null');
//     this.token = this.tokenSubject.asObservable();
 
//   }
 
//   register(user: User): Observable<any> {
//     return this.http.post<User>(`${this.apiUrl}/api/register`, user);
//   }
 
//   login(login: Login): Observable<any> {
//     return this.http.post<User>(`${this.apiUrl}/api/login`, login);
//   }

//   getCurrentUserName(): Observable<string | null> {
//     const decodeToken = this.getToken();
//     this.currentUserName.next(decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
//     return this.currentUserName.asObservable();
//   }
 
//   getCurrentUserId(): Observable<number | null> {
//     const decodeToken = this.getToken();
//     if(decodeToken!=null)
//     {
//       this.currentUserId.next(decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
//       return this.currentUserId.asObservable();
//     }
//     return null;
 
//   }
  
//   storeToken(token: string): void {
//     // localStorage.setItem('token',token);
//     window.sessionStorage.setItem('token', token);
//     this.tokenSubject.next(token);
//   }

//   isLoggedIn(): boolean {
//     return !!window.sessionStorage.getItem('token');
//   }
 
//   getUndecodedToken():Observable<any>
//    {
//     this.tokenSubject.next(window.sessionStorage.getItem('token'));
//     return this.tokenSubject.asObservable();
//   }
 
//   getToken() {
//     // const token = jwtDecode(window.sessionStorage.getItem('token'));
//     // const token=jwtDecode(localStorage.getItem('token'));
//     const token1 = window.sessionStorage.getItem('token');
 
//     try{
//       const token=JSON.parse(atob(token1.split('.')[1]));
 
//       return token;
//     }
//     catch(error)
//     {
//       return null;
//     }
//   }
 
//   tokenExistance(): boolean {
//     const token = window.sessionStorage.getItem('token');
//     if (token) {
//       return true;
//     }
//     return false;
 
//   }
 
//   getUserRole(): string {
//     let token = this.getToken();
//     return token ? token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : "";
 
//   }
 
//   isAdmin(): boolean {
//     let token = this.getToken();
//     return token && token["role"].toLowerCase() == "admin";
//   }
 
//   isUser(): boolean {
//     let token = this.getToken();
//     return token && token["role"].toLowerCase() === "user";
//   }
 
//   logout(): void {
//     // localStorage.removeItem('token');
//     window.sessionStorage.removeItem('token')
//     this.tokenSubject.next(null);
//     this.currentUserId.next(null);
//     this.currentUserName.next(null);
//   }
//   isAuthenticated(){
//     return true;
//   }

// }


