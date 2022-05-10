import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IncomeExpense } from '../models/income-expense.model';
import { IncomeExpenseService } from '../services/income-expense.service';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css']
})
export class IncomeExpensesComponent implements OnInit,OnDestroy {

  incomeForm: FormGroup;
  type: string = "income";
  loading:boolean=false;
  loadingSubscription: Subscription;

  constructor(public fb:FormBuilder,private incomeExpenseService:IncomeExpenseService,private store:Store<AppState>) { }
  
  


  ngOnInit(): void {
    this.loadingSubscription = this.store.select('ui').subscribe(ui => this.loading=ui.isLoading);

    this.incomeForm= this.fb.group({
      description: ['',Validators.required],
      amount: ['',Validators.required]

    })
    }

  ngOnDestroy(): void {
      this.loadingSubscription.unsubscribe();
    }

  save(){

      if(this.incomeForm.invalid){return;}
      this.store.dispatch(uiActions.isLoading());
      
      const {description, amount}= this.incomeForm.value;

      const incomeExpense = new IncomeExpense(description ,amount, this.type);
      this.incomeExpenseService.createIncomeExpense(incomeExpense)
      .then(() => {
        Swal.fire(`${this.type} created `, description, 'success');
        this.store.dispatch(uiActions.stopLoading());
        this.incomeForm.reset();
      }).catch(err => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire('Error',err.message,'error');});
    }
}
