import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SensorsState} from "../state/sensors.state";

export namespace SensorsSelector {
    export const state = createFeatureSelector<SensorsState>("sensors");

    export const currentSensors = createSelector(state, state => state.sensors);

    export const totalAmount = createSelector(state, state => state.totalAmount);

    export const searchCondition = createSelector(state, state => state.searchCondition);

    export const currentPage = createSelector(state, state => state.currentPage);

    export const amountOnPage = createSelector(state, state => state.amountOnPage);

    export const currentSensor = createSelector(state, state => state.currentSensor);

    export const sensorTypes = createSelector(state, state => state.sensorTypes);

    export const unitTypes = createSelector(state, state => state.unitTypes);

    export const lastError = createSelector(state, state => state.lastError);
}
