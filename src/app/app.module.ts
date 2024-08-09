import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const tokenGetter = () => {
	const token = JSON.parse(localStorage.getItem('authToken'));
	return token?.accessToken || null;
};

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		JwtModule.forRoot({config: {tokenGetter}}),
		ToastrModule.forRoot()
	],
	providers: [
		provideHttpClient(withInterceptorsFromDi()),

		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
