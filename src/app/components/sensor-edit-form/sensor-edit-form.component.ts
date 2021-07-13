import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {RouterSelector} from '../../store/selectors/router.selector';
import {SensorsSelector} from '../../store/selectors/sensors.selector';
import {SensorsAction} from '../../store/actions/sensors.action';
import {AuthenticationSelector} from '../../store/selectors/authentication.selector';

@Component({
    selector: 'app-sensor-edit-form',
    templateUrl: './sensor-edit-form.component.html',
    styleUrls: ['./sensor-edit-form.component.css']
})
export class SensorEditFormComponent implements OnInit {

    descriptionPlaceholder = 'Here is a some text input.\n\nHere is another paragraph of input.';

    sensorEditForm: FormGroup = this.fb.group({
        id: -1,
        name: ['', [Validators.required]],
        model: ['', [Validators.required]],
        rangeFrom: ['12', [Validators.required]],
        rangeTo: ['45', [Validators.required]],
        sensorType: ['', [Validators.required]],
        unitType: ['', [Validators.required]],
        location: ['', []],
        description: ['', []],
    });
    isFormSubmitted: boolean = false;

    sensorTypes: string[] = [];
    unitTypes: string[] = [];
    canModify: boolean = false;

    constructor(private route: ActivatedRoute, private fb: FormBuilder,
                public store: Store, private router: Router) {
        this.store.select(RouterSelector.sensorId)
            .subscribe(value => {
                if (value !== undefined) {
                    this.store.dispatch(SensorsAction.getSensor({sensorId: +value}));
                }
            });
        this.store.select(SensorsSelector.currentSensor).subscribe(value => {
            if (value !== undefined) {
                this.sensorEditForm.setValue(value);
            }
        });
        this.store.select(SensorsSelector.currentSensors).subscribe(() => {
            if (this.isFormSubmitted) {
                this.router.navigate(['sensors']).then();
            }
        });
        this.store.select(SensorsSelector.sensorTypes).subscribe(value => this.sensorTypes = value);
        this.store.select(SensorsSelector.unitTypes).subscribe(value => this.unitTypes = value);
        this.store.select(AuthenticationSelector.canModify).subscribe(value => this.canModify = value);
    }

    ngOnInit(): void {
        this.store.dispatch(SensorsAction.getSensorTypes());
        this.store.dispatch(SensorsAction.getUnitTypes());
    }

    onSubmit() {
        if (this.sensorEditForm.valid) {
            this.isFormSubmitted = true;
            if (this.sensorEditForm.value.id == -1) {
                this.store.dispatch(SensorsAction.addSensor({sensor: this.sensorEditForm.value}));
            } else {
                this.store.dispatch(SensorsAction.saveSensor({sensor: this.sensorEditForm.value}));
            }
        } else {
            this.sensorEditForm.markAllAsTouched();
        }
    }

    incRangeFrom() {
        if (this.sensorEditForm.value.rangeFrom < this.sensorEditForm.value.rangeTo - 1)
            this.sensorEditForm.value.rangeFrom++;
    }

    decRangeFrom() {
        this.sensorEditForm.value.rangeFrom--;
    }

    incRangeTo() {
        this.sensorEditForm.value.rangeTo++;
    }

    decRangeTo() {
        if (this.sensorEditForm.value.rangeFrom < this.sensorEditForm.value.rangeTo - 1)
            this.sensorEditForm.value.rangeTo--;
    }
}
