import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenInterface } from '../../token/interfaces/token.interface';
import { LoginDto } from '../../login/dto/login.dto';
import { TokenModel } from './model/token.model';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationClients {
	constructor(private httpClient: HttpClient) {
	}

	public login(loginDto: LoginDto): Observable<TokenModel> {
		return this.httpClient.post<TokenModel>('http://localhost:3000/api/login', loginDto);
	}
}