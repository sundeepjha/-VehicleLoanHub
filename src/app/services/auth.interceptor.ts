import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loderService: LoaderService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loderService.show()
    const token = localStorage.getItem('token'); // Replace with your actual token

    if (!token) {
      return next.handle(req);
    }
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', token)
    });
    return next.handle(clonedReq).pipe(
      finalize(()=> this.loderService.hide())
    );
  }
}
