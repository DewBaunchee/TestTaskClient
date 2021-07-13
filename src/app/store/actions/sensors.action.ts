import {createAction, props} from '@ngrx/store';
import {Sensor} from '../../entities/sensor';

export namespace SensorsAction {

    export const getSensors = createAction(
        '[Sensors] Get Sensors',
        props<{ pageIndex?: number, amountOnPage?: number, searchCondition?: string }>()
    );

    export const getSensorTypes = createAction(
        '[Sensors] Get Sensor Types'
    );

    export const getSensorTypesSuccess = createAction(
        '[Sensors] Get Sensor Types Success',
        props<{ types: string[] }>()
    );

    export const getUnitTypes = createAction(
        '[Sensors] Get Unit Types'
    );

    export const getUnitTypesSuccess = createAction(
        '[Sensors] Get Unit Types Success',
        props<{ types: string[] }>()
    );

    export const addSensor = createAction(
        '[Sensors] Add Sensor',
        props<{ sensor: Sensor }>()
    );

    export const saveSensor = createAction(
        '[Sensors] Edit Sensor',
        props<{ sensor: Sensor }>()
    );

    export const removeSensor = createAction(
        '[Sensors] Remove Sensor',
        props<{ sensorId: number }>()
    );

    export const apiSuccess = createAction(
        '[Sensors] Api Action Success',
        props<{ sensors?: Sensor[], totalAmount?: number }>()
    );

    export const apiError = createAction(
        '[Sensors] Api Action Error',
        props<{ errorText: string }>()
    );

    export const getSensor = createAction(
        '[Sensors] Get Sensor',
        props<{ sensorId: number }>()
    );

    export const getSensorSuccess = createAction(
        '[Sensors] Get Sensor Success',
        props<{ sensor: Sensor }>()
    );
}
