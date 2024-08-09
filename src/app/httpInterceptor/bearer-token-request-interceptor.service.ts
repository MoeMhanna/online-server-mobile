import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class BearerTokenRequestInterceptorService implements HttpInterceptor {
	constructor(private tokenService: TokenService,
	            private router: Router) {
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!this.tokenService.token) {
			return next.handle(req);
		}

		return next.handle(this.addBearerToken(req)).pipe(
			catchError(error => this.handleError(error, req, next))
		);
	}

	private addBearerToken(req: HttpRequest<any>): HttpRequest<any> {
		const routesExceptionForHandlingBearerToken = ['health'];
		if (routesExceptionForHandlingBearerToken.some(route => req.url.includes(route))) {
			return req;
		}
		const token = this.tokenService.token;
		return req.clone({setHeaders: {Authorization: `Bearer ${token.accessToken}`}});
	}

	private handleError(error: any, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (error instanceof HttpErrorResponse) {
			if (error.status === 401) {
				this.logoutUser();
				return throwError(() => new Error('Log out Unauthorized'));
			}

			return throwError(() => error);
		}
		return throwError(() => new Error('Server error'));
	}

	private logoutUser() {
		this.tokenService.token = null;
		this.router.navigate(['/login']);
	}
}