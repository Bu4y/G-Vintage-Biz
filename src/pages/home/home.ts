import { Component, ViewChild } from '@angular/core';
import { LoadingController, NavController, Platform } from 'ionic-angular';
import { OrderModel, OrderService } from "@ngcommerce/core";
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homeData = {} as OrderModel;
  waiting: number = 0;
  accept: number = 0;
  sent: number = 0;
  return: number = 0;
  total: number = 0;
  percentWaiting: number = 0;
  percentAccept: number = 0;
  percentSent: number = 0;
  percentReturn: number = 0;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  doughnutChart: any;
  lineChart: any;
  user: any;
  constructor(public navCtrl: NavController, public orderService: OrderService, public loadingCtrl: LoadingController, ) {
  }
  ionViewWillEnter() {
    // console.log(this.shop);
    // this.shop
    console.log('ionViewDidLoad HomePage');
    let loading = this.loadingCtrl.create();
    loading.present();
    this.orderService.getOrderByShop().then(data => {

      // this.homeData = data;
      this.waiting = data.waiting.length;
      this.accept = data.accept.length;
      this.sent = data.sent.length;
      this.return = data.return.length;
      this.total = (this.waiting + this.accept + this.sent + this.return);
      this.percentWaiting = (this.waiting / this.total) * 100;
      this.percentAccept = (this.accept / this.total) * 100;
      this.percentSent = (this.sent / this.total) * 100;
      this.percentReturn = (this.return / this.total) * 100;
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

        type: 'doughnut',
        data: {
          labels: ["waiting", "accept", "sent", "return"],
          datasets: [{
            label: '# of Votes',
            data: [this.percentWaiting, this.percentAccept, this.percentSent, this.percentReturn],
            // data: [this.percentWaiting, this.percentAccept, this.percentSent, this.percentReturn],
            backgroundColor: [
              "#D8625D",
              "#5C926E",
              "#FFCE56",
              "#36A2EB"
            ]
          }]
        }, legend: {
          align: "right",
          layout: "vertical",
          // verticalAlign: 'top',
          x: 40,
          y: 0
        }

      });
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ["waiting", "accept", "sent", "return"],
          datasets: [
            {
              label: "My Orders",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#bc8856",
              borderColor: "#7f3f00",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "#7f3f00",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#7f3f00",
              pointHoverBorderColor: "#7f3f00",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [this.waiting, this.accept, this.sent, this.return],
              spanGaps: false,
            }
          ]
        }

      });
      loading.dismiss();

    })
  }




}
