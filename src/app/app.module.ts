import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {SensorList} from './sensor-list/sensor-list.component';
import {SensorEditFormComponent} from './sensor-edit-form/sensor-edit-form.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EditableTableComponent} from './editable-table/editable-table.component';
import {ListNavigatorComponent} from './list-navigator/list-navigator.component';
import {HttpClientModule} from '@angular/common/http';
import {GlobalProperties} from './providers/global-properties';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuardService} from './services/auth-guard.service';

const appRoutes: Routes = [
    {path: 'login', component: LoginFormComponent},
    {path: 'sensors', component: SensorList, canActivate: [AuthGuardService]},
    {path: 'sensors/edit', component: SensorEditFormComponent, canActivate: [AuthGuardService]},
    {path: 'sensors/edit/:id', component: SensorEditFormComponent, canActivate: [AuthGuardService]},
    {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
    {path: '**', component: NotFoundComponent},
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
        RouterModule.forRoot(appRoutes),
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [GlobalProperties],
    bootstrap: [AppComponent]
})
export class AppModule {
}
