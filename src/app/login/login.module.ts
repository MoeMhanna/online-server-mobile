import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';

import { LoginRoutingModule } from './login-routing.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		LoginRoutingModule,
		ReactiveFormsModule
	],
	declarations: [LoginPage]
})
export class LoginModule {
}
