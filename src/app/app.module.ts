import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AcceuillComponent } from './acceuill/acceuill.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { GestionUsersComponent } from './gestion-users/gestion-users.component';
import { GestionFacturesComponent } from './gestion-factures/gestion-factures.component';

export function tokenGetter() {
  return localStorage.getItem("Bearer ");
}

const appRoutes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register',component:RegisterComponent} ,
  {path:'gestion-users',component:GestionUsersComponent} ,
  {path: 'acceuill', component: AcceuillComponent},
  {path:'factures',component:GestionFacturesComponent}
  
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AcceuillComponent,
    GestionUsersComponent,
    GestionFacturesComponent
  ],
  imports: [
    ShowHidePasswordModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ) ,
     HttpClientModule,
     JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["/register","/login"],
        blacklistedRoutes: ["/acceuill"]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
   
MatButtonModule,
MatRadioModule,
MatSelectModule,
MatSliderModule,
MatMenuModule,
MatProgressSpinnerModule,
MatDialogModule,
MatTooltipModule,
FormsModule,
ReactiveFormsModule,
ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
