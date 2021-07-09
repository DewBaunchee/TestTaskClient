import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalProperties {
    private serverUrl:string = 'http://192.168.1.144:8080';

    public getServerUrl():string {
        return this.serverUrl;
    }
}
