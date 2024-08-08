import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterface } from './interfaces/token.interface';
import { TokenDto } from './dto/token.dto';


@Injectable({providedIn: 'root'})
export class TokenService {
	public $authenticationSubject = new Subject();
	public $tokenBeSubject = new BehaviorSubject<TokenInterface>(new TokenDto());

	constructor(private jwtHelperService: JwtHelperService) {
	}

	public get isTokenAvailable(): boolean {
		if (!this.token) {
			return false;
		}
		return this.token.accessToken != null;
	}


	public get token(): TokenInterface {
		return this.$tokenBeSubject.value;
	}

	public set token(token: TokenInterface) {
		localStorage.setItem('authToken', JSON.stringify(token));
		this.$tokenBeSubject.next(token);
	}

	public get decodedToken(): any {
		if (this.isTokenAvailable) {
			return this.jwtHelperService.decodeToken(this.token.accessToken);
		}
		return null;
	}

	public get isAuthenticated(): boolean {
		return this.isTokenAvailable;
	}

	public get sid(): string {
		if (!this.decodedToken) {
			return null;
		}
		return this.decodedToken['userId'];
	}

	public get username(): string {
		if (!this.decodedToken) {
			return null;
		}
		return this.decodedToken['username'];
	}
}
