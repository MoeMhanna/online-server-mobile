import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './services/login.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'login.page.html',
	styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {
	public loginForm: FormGroup;

	constructor(private router: Router,
	            private tokenService: TokenService,
	            private toastrService: ToastrService,
	            private loginService: LoginService,
	            protected changeDetectorRef: ChangeDetectorRef) {
		this.loginForm = new FormGroup({
			username: new FormControl(''),
			password: new FormControl('')
		});
	}

	ngOnDestroy(): void {
	}

	ngOnInit(): void {
		this.tokenService.$authenticationSubject.next(null);

	}

	public async login() {
		this.tokenService.$authenticationSubject.next(null);
		try {
			const token = await firstValueFrom(this.loginService.login(this.loginForm.value));
			this.loginForm.enable();
			console.log(token);
			return token;
		} catch (err: any) {
			console.error(err);
			if (err.status === 401 || err.status === 400) {
				const title = "Unauthorized";
				const message = "You have entered an invalid username or password";
				this.toastrService.error(message, title);
			}
			this.loginForm.enable();
			throw err;
		}
	}
}
