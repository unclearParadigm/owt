import { Injectable } from "@angular/core";
import { DataPoint } from "../models/dataPoint";

@Injectable({
    providedIn: 'root'
})
export class DataStorage {
    private readonly StorageKey = "owt_data";

    constructor() {}

    public getAll(): Array<DataPoint> {
        var rawData = window.localStorage.getItem(this.StorageKey);
        if(rawData === null || rawData === undefined) {
            return new Array<DataPoint>();
        }

        return JSON.parse(rawData);
    }

    public add(dataPoint: DataPoint) {
        var all = this.getAll();
        all.push(dataPoint);
        this.writeAll(all);
    }

    public writeAll(dataPoints: Array<DataPoint>) {
        window.localStorage.setItem(this.StorageKey, JSON.stringify(dataPoints));
    }

    public clearAll() {
        window.localStorage.removeItem(this.StorageKey);
    }
    
}