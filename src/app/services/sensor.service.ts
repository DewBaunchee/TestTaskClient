import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sensor} from '../entities/sensor';
import {environment} from "../../environments/environment";
import {Store} from "@ngrx/store";
import {AuthenticationSelector} from "../store/selectors/authentication.selector";

@Injectable({
    providedIn: 'root'
})
export class SensorService {

    private readonly sensorsServiceUrl: string = environment.apiAddress;
    private currentToken: string = '';

    constructor(private httpClient: HttpClient, private store: Store) {
        this.store.select(AuthenticationSelector.currentToken).subscribe(value => this.currentToken = value);
    }

    public getSensors(pageIndex: number, amountOnPage: number, searchCondition: string): Observable<any> {
        let params = new HttpParams()
            .set('pageIndex', pageIndex)
            .set('amountOnPage', amountOnPage)
            .set('searchCondition', searchCondition);
        let authHeaders = this.getAuthorizationHeader();

        return this.httpClient.get(this.sensorsServiceUrl + '/sensors', {
            params: params,
            headers: authHeaders
        });
    }

    public getSensor(sensorId: number): Observable<any> {
        let authHeaders = this.getAuthorizationHeader();

        return this.httpClient.get(this.sensorsServiceUrl + '/sensors/' + sensorId,
            {
                headers: authHeaders
            });
    }

    public getUnitTypes(): Observable<any> {
        let authHeaders = this.getAuthorizationHeader();

        return this.httpClient.get(this.sensorsServiceUrl + '/sensors/units',
            {
                headers: authHeaders
            });
    }

    public getSensorTypes(): Observable<any> {
        let authHeaders = this.getAuthorizationHeader();

        return this.httpClient.get(this.sensorsServiceUrl + '/sensors/types',
            {
                headers: authHeaders
            });
    }

    public add(sensor: Sensor): Observable<any> {
        let authHeaders = this.getAuthorizationHeader();

        return this.httpClient.post(this.sensorsServiceUrl + '/sensors', sensor,
            {
                headers: authHeaders
            });
    }

    public save(sensor: Sensor): Observable<any> {
        let authHeaders = this.getAuthorizationHeader();

        return this.httpClient.post(this.sensorsServiceUrl + '/sensors/' + sensor.id, sensor,
            {
                headers: authHeaders
            });
    }

    public remove(sensorId: number): Observable<any> {
        let authHeaders = this.getAuthorizationHeader();

        return this.httpClient.delete(this.sensorsServiceUrl + '/sensors/' + sensorId,
            {
                headers: authHeaders
            });
    }

    private getAuthorizationHeader() {
        return {Authorization: 'Bearer ' + this.currentToken};
    }
}
