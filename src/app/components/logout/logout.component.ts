import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {AuthenticationState} from "../../store/state/authentication.state";
import {AuthenticationAction} from "../../store/actions/authentication.action";
import {AuthenticationSelector} from "../../store/selectors/authentication.selector";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router, private store: Store<AuthenticationState>) {
        this.store.select(AuthenticationSelector.isAuthenticated).subscribe(value => {
            if(!value) {
                this.router.navigate(['login']).then();
            }
        });
    }

    ngOnInit(): void {
        this.store.dispatch(AuthenticationAction.closeAuthentication());
    }
}
