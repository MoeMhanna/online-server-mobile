import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationClients {
	constructor(private httpClient: HttpClient) {
	}

	public login(data: any) {
		return this.httpClient.post('http://localhost:3000/login', data);
	}
}