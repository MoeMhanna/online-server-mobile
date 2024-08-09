import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './services/login.service';

@Component({
	selector: 'app-chats-page',
	templateUrl: 'login.page.html',
	styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
	public loginForm: FormGroup;

	constructor(private router: Router,
	            private tokenService: TokenService,
	            private loginService: LoginService,
	            protected changeDetectorRef: ChangeDetectorRef) {
		this.loginForm = new FormGroup({
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		});
	}



	ngOnInit(): void {
		this.tokenService.$authenticationSubject.next(null);

	}

	public async login() {
		if (this.loginForm.invalid) {
			return;
		}
		this.tokenService.$authenticationSubject.next(null);
		try {
			await firstValueFrom(this.loginService.login(this.loginForm.value));
			this.loginForm.enable();
			await this.router.navigate(['/landing']);
		} catch (err: any) {
			this.loginForm.enable();
			throw err;
		}
	}
}
