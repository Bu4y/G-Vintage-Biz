import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderService: OrderService) {
    this.getOrder();
    this.channel = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }
  getOrder() {
    this.orderService.getOrderByShop().then((data) => {
      console.log(data);
      this.order = data;
    }, (err) => {
      console.log(err);
    });
  }

  selectedItem(e) {
    console.log(e);
    this.navCtrl.push(OrderDetailPage, e);
    // alert(e);
  }
}
