import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';

import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RegisterRoutingModule
	],
	declarations: [RegisterPage]
})
export class RegisterModule {
}
