import { Component, ComponentFactoryResolver, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IncomeExpenseService } from '../services/income-expense.service';
import * as IEactions from '../income-expenses/income-expense.actions';
import { IncomeExpense } from '../models/income-expense.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  userSubscription: Subscription;
  incomeExpenseSubs: Subscription;

  constructor(private store:Store<AppState>,private incomeExpenseService:IncomeExpenseService) { }

  ngOnInit(): void {
   this.userSubscription = this.store.select('user').pipe(
      filter(auth => auth.user !== null)
    ).subscribe( ({user}) => {
      this.incomeExpenseSubs = this.incomeExpenseService.initIncomeExpensesListener(user!.uid)
      .subscribe(incomeExpensesFb => {
        console.log(incomeExpensesFb);
        this.store.dispatch(IEactions.setItems({items: incomeExpensesFb}));
      
      })

    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.incomeExpenseSubs?.unsubscribe();
  }
}
