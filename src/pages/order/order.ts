import { Loading } from 'ionic-angular/es2015';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { CorService, OrderModel, OrderService, ItemByOrderByShopModel } from "@ngcommerce/core";
import { OrderDetailPage } from '../order-detail/order-detail';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  order = {} as ItemByOrderByShopModel;
  channel: number;
  steps: Array<any> = [
    {
      value: 1,
      title: "New Order"
    },
    {
      value: 2,
      title: "Accept"
    },
    {
      value: 3,
      title: "Sent"
    }
    ,
    {
      value: 4,
      title: "Return"
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderService: OrderService,public loadingCtrl: LoadingController) {
    this.channel = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ionViewWillEnter(){
    this.getOrder();
  }

  getOrder() {
    let loading = this.loadingCtrl.create();
    loading.present();
    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.orderService.getOrderByShop(shop._id).then((data) => {
      console.log(data);
      this.order = data;
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      alert(JSON.parse(err._body).message);
    });
  }

  selectedItem(e) {
    console.log(e);
    this.navCtrl.push(OrderDetailPage, e);
    // alert(e);
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

