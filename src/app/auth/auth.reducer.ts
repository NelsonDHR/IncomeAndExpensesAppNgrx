import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as actions from './auth.actions'
import { unsetUser } from './auth.actions';

export interface State {
    user: User|null; 
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,

    on(actions.setUser, (state, { user }) => 
            ({ ...state, user: {...user}})),
    
    on(actions.unsetUser, state => ({...state, user: null})),

);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
}