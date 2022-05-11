import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer'
import * as incomeExpense from './income-expenses/income-expense.reducer';


export interface AppState {
   ui: ui.State,
   user: auth.State,
  // incomeExpense: incomeExpense.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user:auth.authReducer,
   //incomeExpense: incomeExpense.IncomeExpenseReducer
}