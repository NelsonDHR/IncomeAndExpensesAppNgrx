import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { IncomeExpensesComponent } from './income-expenses.component';
import { OrderIncomePipe } from '../pipes/order-income.pipe';
import { StatisticsComponent } from './statistics/statistics.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { IncomeExpenseReducer } from './income-expense.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailComponent,
    OrderIncomePipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeExpense',IncomeExpenseReducer),
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    NgChartsModule,
    DashboardRoutesModule
  ]
})
export class IncomeExpensesModule { }
