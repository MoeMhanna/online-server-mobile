import { TokenInterface } from '../interfaces/token.interface';

export class TokenDto implements TokenInterface {
	constructor(authToken?: string) {
		this._accessToken = authToken;
	}

	private _accessToken: string;
	get accessToken(): string {
		return this._accessToken;
	}

	set accessToken(value: string) {
		this._accessToken = value;
	}
}