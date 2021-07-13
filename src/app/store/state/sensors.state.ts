import {Sensor} from '../../entities/sensor';

export interface SensorsState {
    sensors: Sensor[];
    totalAmount: number;
    amountOnPage: number;
    currentPage: number;
    searchCondition: string;

    currentSensor?: Sensor;
    sensorTypes: string[];
    unitTypes: string[];
    lastError?: string
}

export const initialSensorsState:SensorsState = {
    sensors: [],
    totalAmount: 0,
    amountOnPage: 4,
    currentPage: 0,
    searchCondition: '',
    sensorTypes: [],
    unitTypes: []
}
