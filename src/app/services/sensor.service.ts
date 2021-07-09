import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalProperties} from '../providers/global-properties';
import {Sensor} from '../entities/sensor';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class SensorService {

    constructor(private httpClient: HttpClient, private globalProperties: GlobalProperties, private authService: AuthService) {
    }

    public getSensors(pageIndex: number, amountOnPage: number, searchCondition: string): Observable<any> | null {
        let params = new HttpParams()
            .set('pageIndex', pageIndex)
            .set('amountOnPage', amountOnPage)
            .set('searchCondition', searchCondition);
        let authHeaders = this.getAuthorizationHeader();
        if (!authHeaders) return null;

        return this.httpClient.get(this.globalProperties.getServerUrl() + '/sensors', {
            params: params,
            headers: authHeaders
        });
    }

    public getSensorsAmount(searchCondition: string): Observable<any> | null {
        let authHeaders = this.getAuthorizationHeader();
        if (!authHeaders) return null;

        return this.httpClient.get(this.globalProperties.getServerUrl() + '/sensors/count',
            {
                params: new HttpParams().set('searchCondition', searchCondition),
                headers: authHeaders
            });
    }

    public getSensor(sensorId: number): Observable<any> | null {
        let authHeaders = this.getAuthorizationHeader();
        if (!authHeaders) return null;

        return this.httpClient.get(this.globalProperties.getServerUrl() + '/sensors/' + sensorId,
            {
                headers: authHeaders
            });
    }

    public getUnitTypes(): Observable<any> | null {
        let authHeaders = this.getAuthorizationHeader();
        if (!authHeaders) return null;

        return this.httpClient.get(this.globalProperties.getServerUrl() + '/sensors/units',
            {
                headers: authHeaders
            });
    }

    public getSensorTypes(): Observable<any> | null {
        let authHeaders = this.getAuthorizationHeader();
        if (!authHeaders) return null;

        return this.httpClient.get(this.globalProperties.getServerUrl() + '/sensors/types',
            {
                headers: authHeaders
            });
    }

    public add(sensor: Sensor): Observable<any> | null {
        let authHeaders = this.getAuthorizationHeader();
        if (!authHeaders) return null;

        return this.httpClient.post(this.globalProperties.getServerUrl() + '/sensors', sensor,
            {
                headers: authHeaders
            });
    }

    public save(sensor: Sensor): Observable<any> | null {
        let authHeaders = this.getAuthorizationHeader();
        if (!authHeaders) return null;

        return this.httpClient.post(this.globalProperties.getServerUrl() + '/sensors/' + sensor.id, sensor,
            {
                headers: authHeaders
            });
    }

    public remove(sensorId: number): Observable<any> | null {
        let authHeaders = this.getAuthorizationHeader();
        if (!authHeaders) return null;

        return this.httpClient.delete(this.globalProperties.getServerUrl() + '/sensors/' + sensorId,
            {
                headers: authHeaders
            });
    }

    private getAuthorizationHeader() {
        let token: string | null = this.authService.getCurrentToken();

        if (token != null && this.authService.isExpired()) {
            const futureResponse: Observable<any> | null = this.authService.getNewToken();
            if (futureResponse == null) return null;
            futureResponse.toPromise().then((response: any) => {
                token = response.token;
            });
        }

        return {Authorization: 'Bearer ' + token};
    }

    public canModifyTable(): boolean {
        return this.authService.canModifyTable();
    }
}
