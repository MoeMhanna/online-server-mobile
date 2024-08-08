export class LoginDto {
	username: string;
	password: string;

	constructor(loginFormValue: { username: string, password: string }) {
		this.username = loginFormValue.username;
		this.password = loginFormValue.password;
	}

	toJSON() {
		return { password: this.password, email: this.username };
	}
}
