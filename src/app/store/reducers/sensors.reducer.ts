import {createReducer, on} from "@ngrx/store";
import {initialSensorsState} from "../state/sensors.state";
import {SensorsAction} from "../actions/sensors.action";
import {AuthenticationAction} from "../actions/authentication.action";

export const sensorsReducer = createReducer(
    initialSensorsState,
    on(SensorsAction.getSensors, (state, {pageIndex, amountOnPage, searchCondition}) => ({
        ...state,
        currentPage: pageIndex === undefined ? state.currentPage : pageIndex,
        amountOnPage: amountOnPage === undefined ? state.amountOnPage : amountOnPage,
        searchCondition: searchCondition === undefined ? state.searchCondition : searchCondition
    })),
    on(SensorsAction.getSensor, (state) => ({
        ...state
    })),
    on(SensorsAction.getSensorTypes, (state) => ({
        ...state
    })),
    on(SensorsAction.getSensorTypesSuccess, (state, {types}) => ({
        ...state,
        sensorTypes: types
    })),
    on(SensorsAction.getUnitTypes, (state) => ({
        ...state
    })),
    on(SensorsAction.getUnitTypesSuccess, (state, {types}) => ({
        ...state,
        unitTypes: types
    })),
    on(SensorsAction.addSensor, (state) => ({
        ...state,
        currentSensor: undefined
    })),
    on(SensorsAction.saveSensor, (state) => ({
        ...state,
        currentSensor: undefined
    })),
    on(SensorsAction.removeSensor, (state) => ({
        ...state,
        currentPage: state.currentPage - (state.sensors.length == 1 ? 1 : 0),
    })),
    on(SensorsAction.apiSuccess, (state, {sensors, totalAmount}) => ({
        ...state,
        totalAmount: totalAmount === undefined ? state.totalAmount : totalAmount,
        sensors: sensors === undefined ? state.sensors : sensors,
        lastError: undefined
    })),
    on(SensorsAction.getSensorSuccess, (state, {sensor}) => ({
        ...state,
        currentSensor: sensor,
        lastError: undefined
    })),
    on(SensorsAction.apiError, (state, {errorText}) => ({
        ...state,
        lastError: errorText
    })),
    on(AuthenticationAction.closeAuthentication, () => initialSensorsState)
);
