import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Sensor} from "../entities/sensor";

@Component({
    selector: 'app-editable-table',
    templateUrl: './editable-table.component.html',
    styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

    @Input() sensors: Sensor[] = [];
    @Input() editable: boolean = true;
    @Output() editRequest = new EventEmitter();
    @Output() removeRequest = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }
}
