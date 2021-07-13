import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AuthenticationState} from "../../store/state/authentication.state";
import {Store} from "@ngrx/store";
import {AuthenticationAction} from "../../store/actions/authentication.action";
import {AuthenticationSelector} from "../../store/selectors/authentication.selector";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    loginForm: FormGroup = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AuthenticationState>) {
        this.store.select(AuthenticationSelector.isAuthenticated).subscribe(value => {
            if (value) {
                this.router.navigate(['sensors']).then();
            }
        });
        this.store.select(AuthenticationSelector.error).subscribe(value => {
           if(value) {
               alert(value);
           }
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.store.dispatch(AuthenticationAction.newAuthentication({
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        }));
    }
}
