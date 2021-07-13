import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store';
import {catchError, map, mergeAll} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthenticationAction} from '../actions/authentication.action';
import {AuthService} from '../../services/auth.service';
import {AuthenticationState} from '../state/authentication.state';
import {AuthenticationSelector} from '../selectors/authentication.selector';

@Injectable()
export class AuthenticationEffect {

    private credentials = {username: '', password: ''};

    constructor(private authService: AuthService, private actions$: Actions, private store: Store<AuthenticationState>) {
        this.store.select(AuthenticationSelector.currentCredentials).subscribe(value => this.credentials = value)
    }

    getNewAuthentication = createEffect(() => this.actions$.pipe(
        ofType(AuthenticationAction.newAuthentication),
        map((action) => this.authService.login(action.username, action.password).pipe(
            map((response) => AuthenticationAction.newAuthenticationSuccess({
                    auth: {
                        username: action.username,
                        password: action.password,
                        token: response.token,
                        canModify: response.canModify,
                        expiredDate: this.authService.getExpiredDate(response.token)
                    }
                })
            ),
            catchError((error) =>
                of(AuthenticationAction.newAuthenticationError({errorText: error.error}))
            )
        )),
        mergeAll()
    ));

    refreshAuthentication = createEffect(() => this.actions$.pipe(
        ofType(AuthenticationAction.refreshAuthentication),
        map(() => AuthenticationAction.newAuthentication({
                username: this.credentials.username,
                password: this.credentials.password
            })
        )
    ));
}
