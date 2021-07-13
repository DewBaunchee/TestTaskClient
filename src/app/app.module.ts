import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {SensorList} from './components/sensor-list/sensor-list.component';
import {SensorEditFormComponent} from './components/sensor-edit-form/sensor-edit-form.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EditableTableComponent} from './components/editable-table/editable-table.component';
import {ListNavigatorComponent} from './components/list-navigator/list-navigator.component';
import {HttpClientModule} from '@angular/common/http';
import {LogoutComponent} from './components/logout/logout.component';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthenticationEffect} from "./store/effects/authentication.effect";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {SensorsEffect} from "./store/effects/sensors.effect";
import {localStorageSync} from "ngrx-store-localstorage";

const appRoutes: Routes = [
    {path: 'login', component: LoginFormComponent},
    {path: 'sensors', component: SensorList, canActivate: [AuthGuardService]},
    {path: 'sensors/edit', component: SensorEditFormComponent, canActivate: [AuthGuardService]},
    {path: 'sensors/edit/:sensorId', component: SensorEditFormComponent, canActivate: [AuthGuardService]},
    {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
    {path: '**', redirectTo: 'login'},
]

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        SensorList,
        SensorEditFormComponent,
        NotFoundComponent,
        EditableTableComponent,
        ListNavigatorComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        StoreRouterConnectingModule.forRoot(),
        StoreModule.forRoot(reducers, {
            metaReducers
        }),
        EffectsModule.forRoot([AuthenticationEffect, SensorsEffect]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}
