import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import jwtDecode from 'jwt-decode';
import {environment} from "../../environments/environment";
import {AuthenticationState} from "../store/state/authentication.state";
import {Store} from "@ngrx/store";
import {AuthenticationSelector} from "../store/selectors/authentication.selector";
import {AuthenticationAction} from "../store/actions/authentication.action";
import {Authentication} from "../entities/authentication";
import {SensorsAction} from "../store/actions/sensors.action";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly api: string = environment.apiAddress;
    private readonly safeTimeGap: number = 0.1;
    private refreshTimeout?: number;

    constructor(private http: HttpClient, private store: Store<AuthenticationState>) {
        let authenticationJson: string | null = localStorage.getItem('authentication');
        if (authenticationJson !== null) {
            let authentication: Authentication = JSON.parse(authenticationJson);
            if(authentication && authentication.expiredDate > Date.now()) {
                this.store.dispatch(AuthenticationAction.newAuthenticationSuccess({auth: authentication}));
            } else {
                localStorage.removeItem('authentication');
            }
        }

        this.store.select(AuthenticationSelector.authentication).subscribe((value) => {
            let auth: Authentication = value;
            if (auth && auth.token && Date.now() < auth.expiredDate) {
                this.refreshTimeout = setTimeout(() => {
                    this.store.dispatch(AuthenticationAction.refreshAuthentication());
                }, (1 - this.safeTimeGap) * (auth.expiredDate - Date.now()));

                localStorage.setItem('authentication', JSON.stringify(value));
            } else {
                clearTimeout(this.refreshTimeout);
                localStorage.removeItem('authentication');
            }
        });
    }

    public login(username: string, password: string): Observable<any> {
        const basicAuth = window.btoa(username + ':' + password);
        return this.http.post(this.api + '/login', null,
            {
                headers: new HttpHeaders({'Authorization': 'Basic ' + basicAuth})
            });
    }

    public getExpiredDate(token: string): number {
        if (token == null) return 0;

        try {
            const decodedToken: any = jwtDecode(token);
            if (decodedToken == null) return 0;

            return decodedToken.token_expiration_date;
        } catch (e) {
            return 0;
        }
    }
}
