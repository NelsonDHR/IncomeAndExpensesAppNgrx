import { Routes } from "@angular/router";
import { DetailComponent } from "../income-expenses/detail/detail.component";
import { IncomeExpensesComponent } from "../income-expenses/income-expenses.component";
import { StatisticsComponent } from "../income-expenses/statistics/statistics.component";

export const dashboardRoutes: Routes=[
    {path:'', component:StatisticsComponent},
    {path:'income-expenses', component:IncomeExpensesComponent},
    {path:'detail', component:DetailComponent}
]