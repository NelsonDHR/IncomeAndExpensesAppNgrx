import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modules
import { AppRoutingModule } from './shared/app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

//firebase
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireAuthModule,} from '@angular/fire/compat/auth';
import { AngularFireModule} from '@angular/fire/compat'

//NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';
import { StatisticsComponent } from './income-expenses/statistics/statistics.component';
import { DetailComponent } from './income-expenses/detail/detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { environment } from 'src/environments/environment.prod';
import { appReducers } from './app.reducer';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      //autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
