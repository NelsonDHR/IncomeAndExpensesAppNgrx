import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modules
import { AppRoutingModule } from './shared/app-routing.module';


//firebase
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireAuthModule,} from '@angular/fire/compat/auth';
import { AngularFireModule} from '@angular/fire/compat'

//NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';


import { AppComponent } from './app.component';


import { environment } from 'src/environments/environment.prod';



//Modules
import { AuthModule } from './auth/auth.module';

import { IncomeExpensesModule } from './income-expenses/income-expenses.module';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AuthModule,

    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      //autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    NgChartsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
