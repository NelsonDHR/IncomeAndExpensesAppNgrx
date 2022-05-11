import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IncomeExpense } from '../models/income-expense.model';
import * as actions from './income-expense.actions'

export interface State {
    items: IncomeExpense[]; 
}

export interface  AppStateWithIE extends AppState{
    incomeExpense:State;
}

export const initialState: State = {
   items: [],
}

const _IncomeExpenseReducer = createReducer(initialState,

    on(actions.setItems, (state,{items}) => ({ ...state, items: {...items}})),
    on(actions.unsetItems, state => ({...state, items:[]}))

);

export function IncomeExpenseReducer(state: State | undefined, action: Action) {
    return _IncomeExpenseReducer(state, action);
}