import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const childRoutes: Routes = [
  {path:'', 
  component:DashboardComponent,
  children: dashboardRoutes,
  //canActivate: [AuthGuard]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
