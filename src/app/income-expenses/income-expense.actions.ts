import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense.model';

export const  setItems = createAction('[IncomeExpense] SetItems', props<{items: IncomeExpense[]}>());
export const  unsetItems = createAction('[IncomeExpense] unsetItems');