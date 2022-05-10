import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from '../models/income-expense.model';

@Pipe({
  name: 'orderIncome'
})
export class OrderIncomePipe implements PipeTransform {

  transform(items: any[]): any[] {
    return items.sort((a,b)=>{
      if(a.type==='income'){
        return -1;
      }else{
        return 1;
      }
    });
  }

}
