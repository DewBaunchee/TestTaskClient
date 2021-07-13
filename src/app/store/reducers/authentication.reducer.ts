import {initialAuthState} from '../state/authentication.state';
import {AuthenticationAction} from '../actions/authentication.action';
import {createReducer, on} from '@ngrx/store';

export const authenticationReducer = createReducer(
    initialAuthState,
    on(AuthenticationAction.newAuthentication, (state) => ({
        ...state
    })),
    on(AuthenticationAction.refreshAuthentication, (state) => ({
        ...state
    })),
    on(AuthenticationAction.newAuthenticationSuccess, (state, {auth}) => ({
        ...state,
        currentAuth: auth,
        lastError: undefined
    })),
    on(AuthenticationAction.newAuthenticationError, (state, {errorText}) => ({
        ...state,
        lastError: errorText
    })),
    on(AuthenticationAction.closeAuthentication, () => initialAuthState)
);
