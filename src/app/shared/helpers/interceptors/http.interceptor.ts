import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage-service/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const user = this.storageService.getUser();
    const language = user.PreferredLanguage || 'en';
    if (user && user.token) {
      request = request.clone({
        setHeaders: {
          'accept-language': language,
          lang: language,
          Authorization: `Bearer ${user.token}`
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'accept-language': language,
          lang: language
        }
      });
    }
    return next.handle(request);

  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];