import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataStorage } from '../../../services/dataStorage';
import { DataPoint } from '../../../models/dataPoint';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {
  private form_weight: string;
  private form_datetime: string;

  constructor(
    private readonly dataStorage: DataStorage,
    private readonly toastController: ToastController) { 
    this.form_datetime = new Date().toISOString();
  }

  ngOnInit() {}

  async trackWeight() {
    if(!this.form_datetime || !this.form_weight) {
      await this.presentToast("Not all values set! Please fill in all fields!", true);
      return;
    }

    var dateTime = new Date(this.form_datetime);
    var weightValue = parseFloat(this.form_weight);

    if(weightValue === undefined 
      || weightValue === null 
      || weightValue === NaN 
      || weightValue < 30
      || weightValue > 300) {
      await this.presentToast("Your weight must be numeric and between 30 and 300 kg!", true);
      this.form_weight = "";
    }

    this.dataStorage.add(new DataPoint(dateTime, weightValue));

    await this.presentToast("Your weight has been saved!", false);
    this.form_weight = "";
  }

  async presentToast(message: string, isError: boolean) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: isError ? 'danger' : 'success',
      position: 'bottom'
    });
    toast.present();
  }
}
