import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from './token/token.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	public isAuthenticated: boolean;
	private subscription$ = new Subscription();
	private authSubscription$ = new Subscription();

	constructor(private tokenService: TokenService,
	            private router: Router,) {
	}

	ngOnInit() {
		this.authenticationSubscription();
		this.tokenService.$authenticationSubject.next(null);
	}

	protected authenticationSubscription() {
		const $authenticationSubscription = this.tokenService
			.$authenticationSubject
			.subscribe({
				next: async () => {
					this.isAuthenticated = this.tokenService.isAuthenticated;
						if (!this.isAuthenticated) {
						return await this.router.navigate(['/login']);
					}
					if (this.subscription$.closed) {
						this.subscription$ = new Subscription();
					}
					return null;
				},
				error: (err) => {
					console.log(err);
				}
			});
		this.authSubscription$.add($authenticationSubscription);
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
		this.authSubscription$.unsubscribe();
	}
}
