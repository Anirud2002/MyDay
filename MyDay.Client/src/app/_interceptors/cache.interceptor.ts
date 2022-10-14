import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map();
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.method !== "GET"){
      return next.handle(request);
    }
    // **************** IMPROVE THE CACHING METHOD IN FUTURE *****************
    const cachedResponse: HttpResponse<unknown> = this.cache.get(request.url);
    if(cachedResponse){
      return of(cachedResponse.clone());
    }else{
      return next.handle(request).pipe(
        tap(stateEvent => {
          if(stateEvent instanceof HttpResponse){
            this.cache.set(request.url, stateEvent.clone());
            
          }
        })
      )
    }
  }
}
