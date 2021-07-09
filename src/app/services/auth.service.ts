import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalProperties} from '../providers/global-properties';
import {Observable} from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private api: string = 'http://localhost:8080';
    private authUsername: string = '';
    private authPassword: string = '';

    constructor(private http: HttpClient, private router: Router,
                private properties: GlobalProperties) {
        this.api = properties.getServerUrl();
    }

    public login(username: string, password: string) {
        const basicAuth = window.btoa(username + ":" + password);
        this.http.post(this.api + '/login', null,
            {
                headers: new HttpHeaders({'Authorization': 'Basic ' + basicAuth})
            }).subscribe((response: any) => {
            this.authPassword = password;
            this.authUsername = username;
            this.setCurrentToken(response);

            this.http.get(this.api + '/sensors',
                {
                    params: new HttpParams().set('can-modify', ''),
                    headers: new HttpHeaders({Authorization: 'Bearer ' + response.token})
                }
            ).subscribe(value => {
                localStorage.setItem('can_modify', value + "");
            });

            this.router.navigate(['sensors']).then();
        });
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('can_modify');
    }

    public isExpired(): boolean {
        const token: string | null = this.getCurrentToken();
        if(token == null) return true;

        const decodedToken: any = jwtDecode(token);
        if(decodedToken == null) return true;

        return decodedToken.token_expiration_date <= new Date();
    }

    public getNewToken(): Observable<any> | null {
        if(this.authUsername.length == 0 || this.authPassword.length == 0) return null;
        const basicAuth = window.btoa(this.authUsername + ':' + this.authPassword);
        const futureResponse = this.http.post(this.api + '/login', null,
            {
                headers: new HttpHeaders({'Authorization': 'Basic ' + basicAuth})
            });
        futureResponse.subscribe((response: any) => {
            this.setCurrentToken(response.token);
        });
        return futureResponse;
    }

    public canModifyTable(): boolean {
        return localStorage.getItem('can_modify') === 'true';
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token !== null && !this.isExpired();
    }

    public setCurrentToken(token: string) {
        localStorage.setItem('token', token);
    }

    public getCurrentToken(): string | null {
        return localStorage.getItem('token');
    }
}
