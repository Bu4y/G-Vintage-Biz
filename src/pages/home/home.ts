import { LoginPage } from './../login/login';
import { Component, ViewChild } from '@angular/core';
import { LoadingController, NavController, App, Events } from 'ionic-angular';
import { HomeService, ShopModel } from "@ngcommerce/core";
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homeData: any = {
    items: {
      day: { amount: 0 },
      month: { amount: 0 },
      year: { amount: 0 },
      categories: [{
        cate: ''
      }]
    },
    report: []
  };
  // waiting: number = 0;
  // accept: number = 0;
  // sent: number = 0;
  // return: number = 0;
  // total: number = 0;
  // percentWaiting: number = 0;
  // percentAccept: number = 0;
  // percentSent: number = 0;
  // percentReturn: number = 0;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  doughnutChart: any;
  lineChart: any;
  user: any;
  shop = {} as ShopModel;
  constructor(
    public navCtrl: NavController,
    public homeService: HomeService,
    public loadingCtrl: LoadingController,
    public app: App,
    public events: Events
  ) {

    events.subscribe('notification:received', () => {
      let shop = JSON.parse(window.localStorage.getItem("shop"));
      this.shop = shop;
      if (this.shop) {
        this.getOrder(this.shop);
      }

      // let currentPage = this.app.getActiveNav().getViews()[0].name;
      // if (currentPage === 'HomePage') {
      //   this.shop = JSON.parse(window.localStorage.getItem('shop'));
      //   if (this.shop) {
      //     this.getOrder(this.shop);
      //   }
      // }

    });

  }
  ionViewWillEnter() {
    console.log('ionViewDidLoad HomePage');

    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.shop = shop;
    if (this.shop) {
      this.getOrder(this.shop);
    }
  }

  getOrder(shop) {

    let loading = this.loadingCtrl.create();
    loading.present();
    this.homeService.getHomeSeller(shop._id).then(data => {

      this.homeData = data;
      console.log(this.homeData);
      // this.waiting = data.waiting.length;
      // this.accept = data.accept.length;
      // this.sent = data.sent.length;
      // this.return = data.return.length;
      // this.total = (this.waiting + this.accept + this.sent + this.return);
      // this.percentWaiting = (this.waiting / this.total) * 100;
      // this.percentAccept = (this.accept / this.total) * 100;
      // this.percentSent = (this.sent / this.total) * 100;
      // this.percentReturn = (this.return / this.total) * 100;
      // if (this.doughnutCanvas) {
      //   this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      //     type: 'doughnut',
      //     data: {
      //       labels: ["waiting", "accept", "sent", "return"],
      //       datasets: [{
      //         label: '# of Votes',
      //         data: [this.percentWaiting, this.percentAccept, this.percentSent, this.percentReturn],
      //         // data: [this.percentWaiting, this.percentAccept, this.percentSent, this.percentReturn],
      //         backgroundColor: [
      //           "#D8625D",
      //           "#5C926E",
      //           "#FFCE56",
      //           "#36A2EB"
      //         ]
      //       }]
      //     }, legend: {
      //       align: "right",
      //       layout: "vertical",
      //       // verticalAlign: 'top',
      //       x: 40,
      //       y: 0
      //     }

      //   });
      // }
      if (this.lineCanvas) {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: [this.homeData.report[3].title, this.homeData.report[2].title, this.homeData.report[1].title, this.homeData.report[0].title],
            datasets: [
              {
                label: "",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "#ffffff",
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
                // data:[12000,2300,300,100000],
                data: [this.homeData.report[3].amount, this.homeData.report[2].amount, this.homeData.report[1].amount, this.homeData.report[0].amount],
                spanGaps: false,
              }
            ]
          },
          options: {
            legend: { display: false }
          }

        });
      }
      loading.dismiss();

    }, err => {
      loading.dismiss();
      // alert(JSON.parse(err._body).message);
      this.app.getRootNav().setRoot(LoginPage);
    })
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
