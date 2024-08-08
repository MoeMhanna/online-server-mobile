import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../token/token.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'login.page.html',
	styleUrls: ['login.page.scss']
})
export class LoginPage{
	public loginForm: FormGroup;

	constructor(private router: Router,
	            private tokenService: TokenService,
	            protected changeDetectorRef: ChangeDetectorRef) {
		this.loginForm = new FormGroup({
			usernameEmail: new FormControl(''),
			password: new FormControl('')
		});
	}

}
