import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import Swal from 'sweetalert2';
import { IncomeExpense } from '../../models/income-expense.model';
import { AppStateWithIE } from '../income-expense.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit,OnDestroy {

  incomeExpense: any[] = [];
  IncomeExpenseSubscription: Subscription;
  
  constructor(private store:Store<AppStateWithIE>,private incomeExpenseService:IncomeExpenseService) { }

  ngOnInit(): void {
    this.IncomeExpenseSubscription=this.store.select('incomeExpense').subscribe(({items})=> {
      this.incomeExpense= Object.values(items);
      console.log(this.incomeExpense);
    });
  }

  ngOnDestroy(): void {
    this.IncomeExpenseSubscription.unsubscribe();
  }

  delete(uid:string){
    console.log(uid);
    this.incomeExpenseService.deleteIncomeExpense(uid)
    .then(()=> Swal.fire('Deleted','Item Deleted','success'))
      .catch(err => Swal.fire('Error',err,'error'))
  }
}
