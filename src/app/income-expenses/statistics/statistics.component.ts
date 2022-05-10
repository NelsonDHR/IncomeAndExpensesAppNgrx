import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  incomes:number=0;
  expenses:number=0;

  totalIncomes:number=0;
  totalExpenses:number=0;

  public doughnutChartLabels: string[] = [ 'Incomes','Expenses' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ this.totalIncomes,this.totalExpenses]}
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store:Store<AppState>) { 

  }

  ngOnInit(): void {
    this.store.select('incomeExpense')
    .subscribe(({items})=> this.generatestatistics(items))
  }

  generatestatistics(items:any[]){

    this.incomes=0;
    this.expenses=0;
  
    this.totalIncomes=0;
    this.totalExpenses=0;

    for (const  item of Object.values(items)) {
      if(item.type==='income'){
        this.totalIncomes += item.amount;
        this.incomes ++;
      }else{
        this.totalExpenses += item.amount;
        this.expenses ++;
      }
     this.doughnutChartData.datasets = [{ data: [ this.totalIncomes,this.totalExpenses]}];
    }


  }

}
