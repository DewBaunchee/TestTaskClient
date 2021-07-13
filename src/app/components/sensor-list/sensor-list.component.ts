import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Sensor} from '../../entities/sensor';
import {SensorsSelector} from '../../store/selectors/sensors.selector';
import {SensorsAction} from '../../store/actions/sensors.action';
import {AuthenticationSelector} from '../../store/selectors/authentication.selector';

@Component({
    selector: 'app-sensor-list',
    templateUrl: './sensor-list.component.html',
    styleUrls: ['./sensor-list.component.css']
})
export class SensorList implements OnInit {

    formSearchCondition: string = '';
    canModify: boolean = false;

    totalSensorsAmountByCondition: number = 0;
    currentPageIndex: number = 0;
    sensorsAmountOnPage: number = 0;

    visibleSensors: Sensor[] = [];

    constructor(private router: Router, private store: Store) {
        this.store.select(SensorsSelector.currentSensors).subscribe(value => this.visibleSensors = value);
        this.store.select(SensorsSelector.searchCondition).subscribe(value => this.formSearchCondition = value);
        this.store.select(SensorsSelector.currentPage).subscribe(value => this.currentPageIndex = value);
        this.store.select(SensorsSelector.amountOnPage).subscribe(value => this.sensorsAmountOnPage = value);
        this.store.select(SensorsSelector.totalAmount).subscribe(value => this.totalSensorsAmountByCondition = value);
        this.store.select(SensorsSelector.lastError).subscribe(value => {
            if (value !== undefined) {
                alert(value);
            }
        })

        this.store.select(AuthenticationSelector.canModify).subscribe(value => this.canModify = value);
    }

    ngOnInit(): void {
        this.store.dispatch(SensorsAction.getSensors({pageIndex: this.currentPageIndex}));
    }

    setPageSelected(pageIndex: number): void {
        if (pageIndex !== this.currentPageIndex)
            this.store.dispatch(SensorsAction.getSensors({pageIndex: pageIndex}));
    }

    search(): void {
        this.store.dispatch(SensorsAction.getSensors({searchCondition: this.formSearchCondition}))
    }

    edit(sensorId: number) {
        this.router.navigate(['sensors', 'edit', sensorId]).then();
    }

    remove(sensorId: number) {
        this.store.dispatch(SensorsAction.removeSensor({sensorId: sensorId}))
    }

    searchInputKeyDown(event: any) {
        if (event.key === 'Enter') this.search();
    }
}
