import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {routerReducer, RouterReducerState} from "@ngrx/router-store";
import {AuthenticationState} from "../state/authentication.state";
import {authenticationReducer} from "./authentication.reducer";
import {SensorsState} from "../state/sensors.state";
import {sensorsReducer} from "./sensors.reducer";
import {localStorageSync} from "ngrx-store-localstorage";

export interface State {
    router: RouterReducerState;
    auth: AuthenticationState;
    sensors: SensorsState;
}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
    auth: authenticationReducer,
    sensors: sensorsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
