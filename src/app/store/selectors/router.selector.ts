import {getSelectors, RouterReducerState} from '@ngrx/router-store';
import {createFeatureSelector} from '@ngrx/store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
    selectRouteParam // factory function to select a route param
} = getSelectors(selectRouter);

export namespace RouterSelector {
    export const sensorId = selectRouteParam('sensorId');
}
