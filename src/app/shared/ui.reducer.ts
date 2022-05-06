import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './ui.actions';

export interface State {
    isLoading: boolean; 
}

export const initialState: State = {
    isLoading: false, 
}

const _uiReducer = createReducer(initialState,

    on(actions.isLoading, state => ({ ...state, isLoading: true})),
    on(actions.stopLoading, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state: State | undefined, action: Action) {
    return _uiReducer(state, action);
}