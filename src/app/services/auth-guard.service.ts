import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {AuthenticationState} from "../store/state/authentication.state";
import {AuthenticationSelector} from "../store/selectors/authentication.selector";


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    private isAuthenticated: boolean = false;

    constructor(public router: Router, private store: Store<AuthenticationState>) {
        this.store.select(AuthenticationSelector.isAuthenticated).subscribe(value => this.isAuthenticated = value);
    }

    canActivate(): boolean {
        if (!this.isAuthenticated) {
            this.router.navigate(['login']).then();
            return false;
        }
        return true;
    }
}
