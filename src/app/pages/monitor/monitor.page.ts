import { Component, OnInit } from '@angular/core';
import { DataStorage } from '../../../services/dataStorage';
import * as Chart from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.page.html',
  styleUrls: ['./monitor.page.scss'],
})
export class MonitorPage implements OnInit {
  private chart: Chart;

  constructor(private readonly dataStorage: DataStorage, private readonly router: Router) { 
    router.events.subscribe(() => {
      this.updateChart();
    });
  }


  private updateChart() {
    var dataFromStorage = this.dataStorage.getAll()
    .map(dataPoint => { return {
      x: dataPoint.dateTime,
      y: dataPoint.weightValue
    }})
    .sort((dp1, dp2) => dp1.x > dp2.x ? 0 : 1);

    var averageValue = dataFromStorage
    .map(dp => dp.y)
    .reduce((dp1: number, dp2: number) => (dp1 + dp2) / 2);

    var averageLine = dataFromStorage
    .map(dataPoint => { return {
      x: dataPoint.x,
      y: averageValue
    }});

    this.chart.data = {
      datasets:[ {
        label: 'Weight',
        data: dataFromStorage,
        borderColor: '#7044ff',
        hoverBackgroundColor: '#7044ff'
      },{
        label: 'Average',
        data: averageLine,
        borderColor: '#10dc60',
        hoverBackgroundColor: '#10dc60'
      }]
    };

    this.chart.render();
    this.chart.update();
  }

  ngOnInit() {
    var canvas = <HTMLCanvasElement>document.getElementById('weight-chart');
    var context = canvas.getContext('2d');

    this.chart = new Chart(context, {
      type: 'line',
      options: {
        scales: {
          xAxes: [{
            distribution: 'linear',
            type: 'time',
            time: {
              unit: 'day'
            }
          }]
        }
      }
    });

    this.updateChart();
  }
}
