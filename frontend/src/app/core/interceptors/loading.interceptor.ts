import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private readonly loadingService: LoadingService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.loadingService.loadingOn();

        if (request.context.get(SkipLoading)) {
            return next.handle(request);
        }

        return next.handle(request).pipe(
            finalize(() => {
                this.loadingService.loadingOff();
                console.log("Profil chargé");
            })
        );
    }
}
