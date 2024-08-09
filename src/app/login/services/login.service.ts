import { Injectable } from '@angular/core';
import { AuthenticationClients } from '../../clients/authenitcations/authentication.clients';
import { TokenInterface } from '../../token/interfaces/token.interface';
import { map, Observable, tap } from 'rxjs';
import { LoginDto } from '../dto/login.dto';
import { TokenService } from '../../token/token.service';
import { TokenModel } from '../../clients/authenitcations/model/token.model';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(private authenticationClients: AuthenticationClients,
	            private tokenService: TokenService) {
	}

	public login(loginFormValue: { username: string, password: string }): Observable<TokenInterface> {
		const loginDto = new LoginDto(loginFormValue);
		return this.authenticationClients
			.login(loginDto)
			.pipe(
				map((tokenModel: TokenModel) => {
					return {accessToken: tokenModel.token};
				}),
				tap((token: TokenInterface) => {
					this.tokenService.token = token;
					this.tokenService.$authenticationSubject.next(null);
				})
			);
	}
}