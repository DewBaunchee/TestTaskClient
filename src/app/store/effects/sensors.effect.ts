import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, mergeAll} from 'rxjs/operators';
import {of} from 'rxjs';
import {SensorsAction} from '../actions/sensors.action';
import {SensorsState} from '../state/sensors.state';
import {SensorService} from '../../services/sensor.service';
import {SensorsSelector} from "../selectors/sensors.selector";

@Injectable()
export class SensorsEffect {

    private currentPage: number = 0;
    private amountOnPage: number = 0;
    private searchCondition: string = '';

    constructor(private sensorService: SensorService, private actions$: Actions, private store: Store<SensorsState>) {
        this.store.select(SensorsSelector.currentPage).subscribe(value => this.currentPage = value);
        this.store.select(SensorsSelector.amountOnPage).subscribe(value => this.amountOnPage = value);
        this.store.select(SensorsSelector.searchCondition).subscribe(value => this.searchCondition = value);
    }

    getSensors = createEffect(() => this.actions$.pipe(
        ofType(SensorsAction.getSensors),
        map(action => {
                let pageIndex = action.pageIndex === undefined ? this.currentPage : action.pageIndex;
                let amountOnPage = action.amountOnPage === undefined ? this.amountOnPage : action.amountOnPage;
                let searchCondition = action.searchCondition === undefined ? this.searchCondition : action.searchCondition;
                return this.sensorService.getSensors(pageIndex, amountOnPage, searchCondition).pipe(
                    map(response => SensorsAction.apiSuccess({
                        sensors: response.sensors,
                        totalAmount: response.totalAmount
                    })),
                    catchError(error => of(SensorsAction.apiError({errorText: error.error}))))
            }
        ),
        mergeAll()
    ));

    getSensorTypes = createEffect(() => this.actions$.pipe(
        ofType(SensorsAction.getSensorTypes),
        map(() => {
                return this.sensorService.getSensorTypes().pipe(
                    map(response => SensorsAction.getSensorTypesSuccess({
                        types: response
                    })),
                    catchError(error => of(SensorsAction.apiError({errorText: error.error}))))
            }
        ),
        mergeAll()
    ));

    getUnitTypes = createEffect(() => this.actions$.pipe(
        ofType(SensorsAction.getUnitTypes),
        map(() => {
                return this.sensorService.getUnitTypes().pipe(
                    map(response => SensorsAction.getUnitTypesSuccess({
                        types: response
                    })),
                    catchError(error => of(SensorsAction.apiError({errorText: error.error}))))
            }
        ),
        mergeAll()
    ));

    addSensor = createEffect(() => this.actions$.pipe(
        ofType(SensorsAction.addSensor),
        map((action) => this.sensorService.add(action.sensor).pipe(
            map(() => SensorsAction.getSensors({})),
            catchError(error => of(SensorsAction.apiError({errorText: error.error}))))
        ),
        mergeAll()
        )
    );

    editSensor = createEffect(() => this.actions$.pipe(
        ofType(SensorsAction.saveSensor),
        map((action) => this.sensorService.save(action.sensor).pipe(
            map(() => SensorsAction.getSensors({})),
            catchError(error => of(SensorsAction.apiError({errorText: error.error}))))
        ),
        mergeAll()
        )
    );

    removeSensor = createEffect(() => this.actions$.pipe(
        ofType(SensorsAction.removeSensor),
        map((action) => this.sensorService.remove(action.sensorId).pipe(
            map(() => SensorsAction.getSensors({})),
            catchError(error => of(SensorsAction.apiError({errorText: error.error}))))
        ),
        mergeAll()
        )
    );

    getSensor = createEffect(() => this.actions$.pipe(
        ofType(SensorsAction.getSensor),
        map((action) => {
                return this.sensorService.getSensor(action.sensorId).pipe(
                    map(response => SensorsAction.getSensorSuccess({sensor: response})),
                    catchError(error => of(SensorsAction.apiError({errorText: error.error}))))
            }
        ),
        mergeAll()
        )
    );
}
