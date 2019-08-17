export class DataPoint {

    public dateTime: Date;
    public weightValue: number;

    constructor(dateTime: Date, weightValue: number) {
        this.dateTime = dateTime;
        this.weightValue = weightValue;
    }
}