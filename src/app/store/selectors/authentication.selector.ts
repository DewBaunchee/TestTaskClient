import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AuthenticationState} from "../state/authentication.state";

export namespace AuthenticationSelector {
    export const state = createFeatureSelector<AuthenticationState>("auth");

    export const authentication = createSelector(state, state => state.currentAuth);

    export const isAuthenticated = createSelector(state, state => state.currentAuth.expiredDate > Date.now());

    export const canModify = createSelector(state, state => state.currentAuth.canModify);

    export const currentToken = createSelector(state, state => state.currentAuth.token);

    export const currentCredentials = createSelector(state, state => ({
        username: state.currentAuth.username,
        password: state.currentAuth.password
    }));

    export const expiredDate = createSelector(state, state => state.currentAuth.expiredDate)

    export const error = createSelector(state, state => state.lastError);
}
